"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import birdsData from "@/data/birds.json";

export default function Galeria() {
  const [activeCategory, setActiveCategory] = useState("todas");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [items, setItems] = useState([]);

  // Poblar la galería con fotos reales de aves y algunos placeholders para Flora/Paisajes
  useEffect(() => {
    // Tomar algunas aves representativas con buenas fotos
    const birdsList = (birdsData.birds || []).slice(0, 12).map((bird) => ({
      id: bird.id,
      src: bird.imagen || `/assets/images/aves/${bird.nombreCientifico}.jpg`,
      alt: bird.nombreComun,
      caption: `${bird.nombreComun} ( ${bird.nombreCientifico} )`,
      category: "aves",
    }));

    // Añadir algunos paisajes y flora simulados o del sistema para rellenar las categorías
    const extraItems = [
      {
        id: "paisaje-1",
        src: "/assets/images/aves/image1.png",
        alt: "Rutas y Senderos del Corredor",
        caption: "Vista aérea cartográfica de las rutas del CBBM",
        category: "paisajes",
      },
      {
        id: "paisaje-2",
        src: "/assets/images/aves/image2.jpeg",
        alt: "Ecosistema del Bosque Húmedo",
        caption: "Senderos en el bosque húmedo tropical de Limón",
        category: "paisajes",
      },
      {
        id: "paisaje-3",
        src: "/assets/images/aves/image4.jpg",
        alt: "Cuencas Hidrográficas del Caribe",
        caption: "Afluente de la cuenca del Río Banano",
        category: "paisajes",
      },
      {
        id: "flora-1",
        src: "/assets/images/aves/image5.jpg",
        alt: "Flora Nativa - Heliconias",
        caption: "Platanillas y heliconias típicas de las zonas húmedas",
        category: "flora",
      },
    ];

    setItems([...birdsList, ...extraItems]);
  }, []);

  const filteredItems =
    activeCategory === "todas"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );
  };

  // Manejar teclado para el Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext(e);
      if (e.key === "ArrowLeft") showPrev(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <div className="section-light" style={{ padding: "4rem 0" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link> / <span>Galería Fotográfica</span>
        </nav>

        {/* Título de la Página */}
        <h1 className="page-title">Galería Fotográfica</h1>
        <p className="page-description">
          Explora nuestra colección de fotografías de biodiversidad, flora y
          paisajes del corredor biológico.
        </p>

        {/* Filtros de Categorías */}
        <div className="gallery-filters">
          {["todas", "aves", "flora", "paisajes", "actividades"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Galería de Imágenes */}
        <section className="photo-gallery">
          {filteredItems.length === 0 ? (
            <p className="no-results" style={{ textAlign: "center", margin: "2rem 0" }}>
              No hay imágenes en esta categoría actualmente.
            </p>
          ) : (
            <div className="gallery-grid" id="gallery-container">
              {filteredItems.map((item, index) => (
                <div key={item.id} className="gallery-item">
                  <a
                    href="#"
                    className="gallery-link"
                    onClick={(e) => {
                      e.preventDefault();
                      openLightbox(index);
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23e8f5e9"/><text x="150" y="100" font-family="Arial" font-size="50" text-anchor="middle" fill="%234caf50">📷</text></svg>';
                      }}
                    />
                    <div className="gallery-overlay">
                      <p className="gallery-caption">{item.alt}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="lightbox active" id="lightbox" onClick={closeLightbox}>
            <button
              className="lightbox-close"
              aria-label="Cerrar lightbox"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <button
              className="lightbox-prev"
              aria-label="Imagen anterior"
              onClick={showPrev}
            >
              ‹
            </button>
            <button
              className="lightbox-next"
              aria-label="Imagen siguiente"
              onClick={showNext}
            >
              ›
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].alt}
                id="lightbox-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23e8f5e9"/><text x="300" y="210" font-family="Arial" font-size="30" text-anchor="middle" fill="%23555">Fotografía no disponible</text></svg>';
                }}
              />
              <p className="lightbox-caption" id="lightbox-caption">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
