"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function Carousel({ items }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const containerCenter = carouselRef.current.scrollLeft + (carouselRef.current.clientWidth / 2);
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(carouselRef.current.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + (child.offsetWidth / 2);
      const distance = Math.abs(childCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (activeIndex !== closestIndex) {
      setActiveIndex(closestIndex);
    }
  };

  // Trigger initial calculation
  useEffect(() => {
    handleScroll();
  }, []);

  const defaultItems = [
    { href: "/aves", bg: "url('/assets/images/cards/card-fauna.png')", icon: "🐦", title: "Fauna", desc: "Especies del corredor con fotografías y cantos" },
    { href: "/sobre-el-corredor", bg: "url('/assets/images/cards/card-corredor.png')", icon: "🌳", title: "Sobre el Corredor", desc: "Conoce más sobre ecosistemas y conectividad" },
    { href: "/mapa", bg: "url('/assets/images/cards/card-mapa.png')", icon: "🗺️", title: "Mapa de rutas", desc: "Consulta el mapa interactivo del corredor" },
    { href: "/conteo-aves-2024", bg: "url('/assets/images/cards/card-conteo.png')", icon: "📊", title: "Conteo 2024", desc: "Resultados, ciencia ciudadana y comunidad" },
    { href: "/cuidar-naturaleza", bg: "url('/assets/images/cards/card-naturaleza.png')", icon: "🛡️", title: "Proteger", desc: "Derecho a un ambiente sano y canales de reporte" }
  ];

  const displayItems = items || defaultItems;

  const scrollToDot = (index) => {
    if (carouselRef.current) {
      const child = carouselRef.current.children[index];
      if (child) {
        carouselRef.current.scrollTo({
          left: child.offsetLeft - (carouselRef.current.clientWidth / 2) + (child.offsetWidth / 2),
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button 
        onClick={scrollLeft}
        className="carousel-arrow left"
        aria-label="Desplazar a la izquierda"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div className="carousel-grid" ref={carouselRef} onScroll={handleScroll}>
        {displayItems.map((item, index) => (
          <Link key={index} href={item.href} className="carousel-image-card">
            <div className="card-bg" style={{ backgroundImage: item.bg }}></div>
            <div className="card-glass-overlay">
              <h3 style={{ margin: "0 0 0.25rem 0", color: "var(--primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span> {item.title}
              </h3>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      {/* Paginación Dots */}
      <div className="carousel-dots">
        {displayItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToDot(index)}
            aria-label={`Ir a la tarjeta ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
