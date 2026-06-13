"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function BirdDetailClient({ bird }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const audioRef = useRef(null);

  const handleCarouselScroll = () => {
    const el = document.getElementById("characteristics-carousel");
    if (!el) return;
    
    const containerCenter = el.scrollLeft + (el.clientWidth / 2);
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(el.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + (child.offsetWidth / 2);
      const distance = Math.abs(childCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (activeCarouselIndex !== closestIndex) {
      setActiveCarouselIndex(closestIndex);
    }
  };

  // Detener el audio si el componente se desmonta y calcular scroll inicial
  useEffect(() => {
    handleCarouselScroll();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!bird) {
    return (
      <div className="section-light" style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="error-message" style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Ave no encontrada</h2>
            <p>La especie solicitada no existe en nuestro catálogo del Conteo 2024.</p>
            <Link href="/aves" className="btn btn-primary" style={{ marginTop: "1rem", display: "inline-block" }}>
              Volver a Fauna
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Error al reproducir audio:", err);
        alert("El canto para esta especie no se encuentra disponible actualmente.");
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="section-light" style={{ padding: "4rem 0" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link> / <Link href="/aves">Fauna</Link> /{" "}
          <span>{bird.nombreComun}</span>
        </nav>

        {/* Botón Volver */}
        <Link href="/aves" className="btn-back" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
          ← Volver a Fauna
        </Link>

        {/* Información Principal del Ave */}
        <section className="bird-detail" style={{ marginBottom: "3rem" }}>
          <div className="bird-main-info">
            <div className="bird-image-container">
              <img
                src={bird.imagen ? (bird.imagen.startsWith('/') ? bird.imagen : `/${bird.imagen}`) : "/assets/images/aves/placeholder.jpg"}
                alt={bird.nombreComun}
                className="bird-main-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23e8f5e9"/><text x="300" y="170" font-family="Arial" font-size="80" text-anchor="middle" fill="%234caf50">🐦</text><text x="300" y="240" font-family="Arial" font-size="20" text-anchor="middle" fill="%23555">Sin fotografía disponible</text></svg>';
                }}
              />

              {bird.audio && (
                <>
                  <button
                    className={`btn-audio ${isPlaying ? "playing" : ""}`}
                    onClick={toggleAudio}
                    aria-label="Reproducir canto del ave"
                  >
                    <span className="audio-icon">{isPlaying ? "⏹️" : "🔊"}</span>
                    <span className="audio-text">
                      {isPlaying ? "Detener Canto" : "Escuchar Canto"}
                    </span>
                  </button>
                  <audio
                    ref={audioRef}
                    src={bird.audio ? (bird.audio.startsWith('/') ? bird.audio : `/${bird.audio}`) : ""}
                    preload="none"
                    onEnded={handleAudioEnded}
                  />
                </>
              )}
            </div>

            <div className="bird-header-info">
              {bird.emblematica && (
                <span className="emblematic-badge" style={{ display: "inline-block", marginBottom: "0.5rem" }}>
                  ⭐ Especie Emblemática {bird.ganadoraConteo2024 ? "- Ganadora Conteo 2024" : ""}
                </span>
              )}
              <h1>{bird.nombreComun}</h1>
              <p className="scientific-name">
                <em>{bird.nombreCientifico}</em>
              </p>
              <div className="bird-quick-info">
                <span className="info-badge">
                  Tamaño: {capitalize(bird.tamaño || "no especificado")}
                </span>
                {bird.habitat && bird.habitat.length > 0 && (
                  <span className="info-badge">
                    Hábitat: {bird.habitat.map((h) => capitalize(h)).join(", ")}
                  </span>
                )}
                {bird.conservacion && (
                  <span className="info-badge">Estado: {bird.conservacion}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Características en Carrusel */}
        <h2 style={{ color: "var(--primary)", marginBottom: "1.5rem" }}>Características y Detalles</h2>
        <div style={{ position: "relative", width: "100%", marginBottom: "4rem" }}>
          <button 
            onClick={() => {
              const el = document.getElementById("characteristics-carousel");
              if(el) el.scrollBy({ left: -340, behavior: "smooth" });
            }}
            className="carousel-arrow left"
            aria-label="Desplazar a la izquierda"
            style={{ zIndex: 10 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div id="characteristics-carousel" className="carousel-grid" onScroll={handleCarouselScroll} style={{ 
            display: "grid", 
            gridAutoFlow: "column", 
            gridAutoColumns: "minmax(300px, 1fr)", 
            gap: "1.5rem", 
            overflowX: "auto", 
            scrollSnapType: "x mandatory",
            padding: "1rem 0 2rem 0"
          }}>
            <section className="detail-section" style={{ scrollSnapAlign: "start", height: "100%", margin: 0 }}>
              <h2>Descripción Física</h2>
              <p>{bird.descripcion || "Descripción física no disponible."}</p>
            </section>

            <section className="detail-section" style={{ scrollSnapAlign: "start", height: "100%", margin: 0 }}>
              <h2>Hábitat y Distribución</h2>
              <p>
                {bird.habitat && bird.habitat.length > 0
                  ? `Esta especie se encuentra principalmente en: ${bird.habitat
                      .map((h) => capitalize(h))
                      .join(", ")}.`
                  : "Información de hábitat no disponible."}
              </p>
            </section>

            <section className="detail-section" style={{ scrollSnapAlign: "start", height: "100%", margin: 0 }}>
              <h2>Alimentación</h2>
              <p>{bird.dieta || "Información de alimentación no disponible."}</p>
            </section>

            <section className="detail-section" style={{ scrollSnapAlign: "start", height: "100%", margin: 0 }}>
              <h2>Comportamiento</h2>
              <p>{bird.comportamiento || "Información de comportamiento no disponible."}</p>
            </section>

            <section className="detail-section" style={{ scrollSnapAlign: "start", height: "100%", margin: 0 }}>
              <h2>Estado de Conservación</h2>
              <p>
                Estado de conservación en el territorio:{" "}
                {bird.conservacion || "No especificado."}
              </p>
            </section>

            <section className="detail-section" style={{ scrollSnapAlign: "start", height: "100%", margin: 0 }}>
              <h2>Características Identificables</h2>
              <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                {bird.colores && bird.colores.length > 0 && (
                  <li>Colores: {bird.colores.map((c) => capitalize(c)).join(", ")}</li>
                )}
                {bird.orden && <li>Orden: {bird.orden}</li>}
                {bird.familia && <li>Familia: {bird.familia}</li>}
                {bird.nombreIngles && <li>Nombre en inglés: {bird.nombreIngles}</li>}
              </ul>
            </section>
          </div>

          <button 
            onClick={() => {
              const el = document.getElementById("characteristics-carousel");
              if(el) el.scrollBy({ left: 340, behavior: "smooth" });
            }}
            className="carousel-arrow right"
            aria-label="Desplazar a la derecha"
            style={{ zIndex: 10 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Paginación Dots */}
          <div className="carousel-dots">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                className={`carousel-dot ${index === activeCarouselIndex ? "active" : ""}`}
                onClick={() => {
                  const el = document.getElementById("characteristics-carousel");
                  if (el) {
                    const child = el.children[index];
                    if (child) {
                      el.scrollTo({
                        left: child.offsetLeft - (el.clientWidth / 2) + (child.offsetWidth / 2),
                        behavior: "smooth"
                      });
                    }
                  }
                }}
                aria-label={`Ir a la característica ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Fuentes fuera del carrusel */}
        {bird.fuentes && bird.fuentes.length > 0 && (
          <section className="sources-section" style={{ backgroundColor: "var(--surface)", padding: "2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", marginTop: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--primary)", marginBottom: "0.5rem" }}>Fuentes y Referencias</h2>
            <p className="sources-hint" style={{ marginBottom: "1rem", color: "var(--text-muted)" }}>Enlaces para verificar y ampliar la información sobre esta especie.</p>
            <ul className="sources-list" style={{ paddingLeft: "1.5rem" }}>
              {bird.fuentes.map((url, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-blue)", wordBreak: "break-all" }}>
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}
