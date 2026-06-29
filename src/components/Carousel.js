"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const defaultItems = [
  { href: "/aves", bg: "url('/assets/images/cards/card-fauna.png')", title: "Fauna", desc: "Especies del corredor con fotografías y cantos" },
  { href: "/sobre-el-corredor", bg: "url('/assets/images/cards/card-corredor.png')", title: "Sobre el Corredor", desc: "Conoce más sobre ecosistemas y conectividad" },
  { href: "/mapa", bg: "url('/assets/images/cards/card-mapa.png')", title: "Mapa de Rutas", desc: "Consulta el mapa interactivo del corredor" },
  { href: "/conteo-aves-2024", bg: "url('/assets/images/cards/card-conteo.png')", title: "Conteo 2024", desc: "Resultados, ciencia ciudadana y comunidad" },
  { href: "/cuidar-naturaleza", bg: "url('/assets/images/cards/card-naturaleza.png')", title: "Proteger la Naturaleza", desc: "Derecho a un ambiente sano y canales de reporte" }
];

export default function Carousel({ items }) {
  const displayItems = items || defaultItems;
  const carouselRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const getLayout = () => {
    const el = carouselRef.current;
    if (!el || !el.children[0]) return { itemW: 340, visible: 1, pages: 1 };
    const gap = parseFloat(getComputedStyle(el).gap) || 24;
    const itemW = el.children[0].offsetWidth + gap;
    const visible = Math.max(1, Math.floor(el.clientWidth / itemW));
    const pages = Math.max(1, displayItems.length - visible + 1);
    return { itemW, visible, pages };
  };

  const syncState = () => {
    const el = carouselRef.current;
    if (!el || !el.children[0]) return;
    const { itemW, pages } = getLayout();
    const page = Math.min(Math.round(el.scrollLeft / itemW), pages - 1);
    setTotalPages(pages);
    setCurrentPage(page);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    syncState();
    const ro = new ResizeObserver(syncState);
    ro.observe(el);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayItems.length]);

  const scrollLeft = () => {
    const { itemW } = getLayout();
    carouselRef.current?.scrollBy({ left: -itemW, behavior: "smooth" });
  };

  const scrollRight = () => {
    const { itemW } = getLayout();
    carouselRef.current?.scrollBy({ left: itemW, behavior: "smooth" });
  };

  const scrollToDot = (pageIndex) => {
    const el = carouselRef.current;
    if (!el || !el.children[pageIndex]) return;
    el.scrollTo({ left: el.children[pageIndex].offsetLeft, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button
        onClick={scrollLeft}
        className="carousel-arrow left"
        aria-label="Desplazar a la izquierda"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className="carousel-grid" ref={carouselRef} onScroll={syncState}>
        {displayItems.map((item, index) => (
          <Link key={index} href={item.href} className="carousel-image-card">
            <div className="card-bg" style={{ backgroundImage: item.bg }}></div>
            <div className="card-glass-overlay">
              <h3 style={{ margin: "0 0 0.25rem 0", color: "var(--primary)" }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="carousel-arrow right"
        aria-label="Desplazar a la derecha"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {totalPages > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === currentPage ? "active" : ""}`}
              onClick={() => scrollToDot(i)}
              aria-label={`Ir a la página ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
