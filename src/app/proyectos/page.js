"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Proyectos() {
  const [activeSlide, setActiveSlide] = useState(0);

  const proyectosAnteriores = [
    {
      id: 1,
      titulo: "Ecoferia del Corredor (2023)",
      desc: "Primera ecoferia y festival del CBBM, con talleres, puestos de artesanías sostenibles y charlas educativas. Punto de partida para el conteo de aves.",
      bg: "/assets/images/aves/image2.jpeg",
    },
    {
      id: 2,
      titulo: "Reforestación Río Banano (2022)",
      desc: "Jornada comunitaria donde se sembraron más de 300 árboles nativos en las riberas del río Banano para proteger la zona de recarga hídrica.",
      bg: "/assets/images/mision.png",
    },
    {
      id: 3,
      titulo: "Talleres Escolares de Conservación (2022)",
      desc: "Educación ambiental impartida en tres escuelas primarias de Matama, enseñando el derecho a un ambiente sano y avistamiento de aves.",
      bg: "/assets/images/vision.png",
    },
  ];

  return (
    <>
      {/* SECCIÓN HERO */}
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/generadas/eje_investigacion.png" alt="Proyectos" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Proyectos del Corredor</h1>
          <p>
            Iniciativas del comité local: inventarios, educación y participación
            comunitaria en el CBBM.
          </p>
        </div>
      </section>

      {/* SECCIÓN 1: PROYECTOS ACTUALES O VIGENTES (Sección Clara) */}
      <section className="section-light content-section" style={{ padding: "4rem 0 2rem 0" }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <Link href="/">Inicio</Link> / <span>Proyectos</span>
          </nav>

          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Proyectos Actuales o Vigentes</h2>

          <div className="overlap-grid" style={{ marginTop: "3rem" }}>
            {/* Proyecto 1: Conteo 2024 */}
            <div className="overlap-item">
              <div className="overlap-image-wrapper">
                <img
                  src="/assets/images/aves/image1.png"
                  alt="Mapa de rutas del Conteo de Aves 2024"
                  loading="lazy"
                />
              </div>
              <div className="overlap-text-card">
                <h3>Conteo de Aves 2024</h3>
                <p style={{ marginBottom: "1rem" }}>
                  Primer inventario regional coordinado por el comité local, con
                  rutas en Selva Bananito, Burrico, San Clemente y Aviarios del
                  Caribe. Logramos registrar una línea base de 180 especies con
                  apoyo de observadores de aves, instituciones y la comunidad de Limón.
                </p>
                <div className="project-actions" style={{ display: "flex", gap: "0.5rem" }}>
                  <Link href="/conteo-aves-2024" className="btn btn-primary">
                    Leer Sistematización
                  </Link>
                  <Link href="/aves" className="btn btn-secondary">
                    Ver Fauna
                  </Link>
                </div>
              </div>
            </div>

            {/* Proyecto 2: Siguiente Conteo y Seguimiento (Invertido) */}
            <div className="overlap-item reverse">
              <div className="overlap-image-wrapper">
                <img
                  src="/assets/images/aves/Amazona autumnalis.jpg"
                  alt="Siguiente conteo de aves y monitoreo"
                  loading="lazy"
                />
              </div>
              <div className="overlap-text-card">
                <h3>Siguiente Conteo y Monitoreo</h3>
                <p style={{ marginBottom: "1.25rem" }}>
                  Profundizar el monitoreo de avifauna con nuevas jornadas
                  anuales, capacitar a más miembros de la comunidad en ciencia
                  ciudadana con eBird y Merlin, y validar científicamente nuestro
                  inventario en línea de biodiversidad.
                </p>
                <a
                  href="mailto:sofiastein1@gmail.com?subject=Participación en Monitoreo CBBM"
                  className="btn btn-primary"
                >
                  Escribir al Comité
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: PROYECTOS ANTERIORES (Sección Oscura / Nocturna) */}
      <section className="section-dark" style={{ padding: "5rem 0", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <h2>Proyectos Anteriores</h2>
          <p style={{ marginBottom: "2.5rem", color: "var(--text-muted)" }}>
            Nuestra trayectoria de acción e impacto ecológico y social en la región en años anteriores.
          </p>

          {/* Estructura del Carrusel Horizontal */}
          <div className="slider-container">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
              }}
            >
              {proyectosAnteriores.map((proj) => (
                <div key={proj.id} className="slide-item">
                  {/* Background image */}
                  <div
                    className="slide-bg"
                    style={{
                      backgroundImage: `url('${proj.bg}')`,
                    }}
                  ></div>
                  {/* Overlay */}
                  <div className="slide-overlay"></div>
                  {/* Content */}
                  <div className="slide-content">
                    <span className="slide-tag">Histórico</span>
                    <h3 className="slide-title">{proj.titulo}</h3>
                    <p className="slide-desc">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botones de navegación del Slider */}
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + proyectosAnteriores.length) % proyectosAnteriores.length)}
              className="slider-btn prev"
              aria-label="Proyecto anterior"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % proyectosAnteriores.length)}
              className="slider-btn next"
              aria-label="Proyecto siguiente"
            >
              ›
            </button>
          </div>

          {/* Indicadores de Dots */}
          <div className="slider-dots">
            {proyectosAnteriores.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`slider-dot ${activeSlide === index ? "active" : ""}`}
                aria-label={`Ir al proyecto ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
