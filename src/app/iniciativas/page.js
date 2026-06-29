import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react";
import { AnimatedDiv } from "@/components/AnimatedSection";
import { articulos } from "@/data/articulos";

const proyectos = [
  {
    titulo: "Conteo de Aves 2024",
    categoria: "Vigente",
    fecha: "Octubre 2024",
    imagen: "/assets/images/aves/image1.png",
    resumen:
      "Primer inventario regional con rutas en Selva Bananito, Burrico, San Clemente y Aviarios del Caribe. Línea base de 177 especies registradas con apoyo de observadores, instituciones y la comunidad de Limón.",
    href: "/conteo-aves-2024",
  },
  {
    titulo: "Monitoreo y Ciencia Ciudadana 2025",
    categoria: "En planificación",
    fecha: "2025",
    imagen: "/assets/images/aves/Amazona autumnalis.jpg",
    resumen:
      "Nuevas jornadas anuales de monitoreo de avifauna, capacitación en eBird y Merlin, y validación científica del inventario de biodiversidad del corredor.",
    contacto: "sofiastein1@gmail.com",
  },
  {
    titulo: "Ecoferia del Corredor",
    categoria: "Histórico",
    fecha: "Abril 2023",
    imagen: "/assets/images/aves/image2.jpeg",
    resumen:
      "Primera ecoferia y festival del CBBM con talleres, artesanías sostenibles y charlas educativas. Evento fundacional de la organización comunitaria.",
  },
  {
    titulo: "Reforestación Río Banano",
    categoria: "Histórico",
    fecha: "2022",
    imagen: "/assets/images/mision.png",
    resumen:
      "Más de 300 árboles nativos sembrados en las riberas del río Banano para proteger la zona de recarga hídrica de la región.",
  },
  {
    titulo: "Talleres Escolares de Conservación",
    categoria: "Histórico",
    fecha: "2022",
    imagen: "/assets/images/vision.png",
    resumen:
      "Educación ambiental en tres escuelas primarias de Matama: derecho a un ambiente sano y avistamiento de aves.",
  },
];

const badgeStyle = {
  Vigente: {},
  "En planificación": { background: "var(--accent-amber)", color: "#1C1B1A" },
  Histórico: {
    background: "rgba(90,90,90,0.12)",
    color: "var(--text-muted)",
    border: "1px solid var(--border)",
  },
};

export default function Iniciativas() {
  return (
    <>
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image
            src="/assets/images/generadas/proyectos_hero_1782529824789.jpg"
            alt="Iniciativas del Corredor"
            fill
            priority
          />
        </div>
        <div className="hero-page-content">
          <h1>Iniciativas del Corredor</h1>
          <p>
            Proyectos, noticias y acciones del comité local en el Corredor
            Biológico Bosque Las Madres.
          </p>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="content-section">
        <div className="container">
          <nav
            className="breadcrumbs"
            aria-label="Breadcrumb"
            style={{ marginBottom: "2rem" }}
          >
            <Link href="/">Inicio</Link> / <span>Iniciativas</span>
          </nav>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Proyectos
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>
            Acciones de conservación, educación y monitoreo en el territorio del
            CBBM.
          </p>

          <AnimatedDiv>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {proyectos.map((p) => {
              const badge = badgeStyle[p.categoria] || {};
              const inner = (
                <article
                  className="bird-card"
                  style={{
                    cursor: p.href || p.contacto ? "pointer" : "default",
                    height: "100%",
                  }}
                >
                  <div style={{ position: "relative", height: "200px" }}>
                    <Image
                      src={p.imagen}
                      alt={p.titulo}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      className="slide-tag"
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        zIndex: 2,
                        ...badge,
                      }}
                    >
                      {p.categoria}
                    </span>
                  </div>
                  <div className="bird-info">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Calendar size={14} color="var(--text-muted)" />
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {p.fecha}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontFamily: "var(--font-heading)",
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.2",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {p.titulo}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--text-muted)",
                        margin: 0,
                        lineHeight: "1.6",
                        flexGrow: 1,
                      }}
                    >
                      {p.resumen}
                    </p>
                    {p.contacto && (
                      <a
                        href={`mailto:${p.contacto}?subject=Participación en Monitoreo CBBM`}
                        className="btn btn-primary"
                        style={{
                          marginTop: "1.25rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontSize: "0.88rem",
                        }}
                      >
                        <Mail size={14} /> Escribir al comité
                      </a>
                    )}
                    {p.href && (
                      <span
                        className="text-link"
                        style={{
                          marginTop: "1.25rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "0.88rem",
                        }}
                      >
                        Ver más <ArrowRight size={14} />
                      </span>
                    )}
                  </div>
                </article>
              );

              if (p.href)
                return (
                  <Link
                    key={p.titulo}
                    href={p.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {inner}
                  </Link>
                );
              return <div key={p.titulo}>{inner}</div>;
            })}
          </div>
          </AnimatedDiv>
        </div>
      </section>

      {/* NOTICIAS */}
      <section
        className="content-section"
        style={{
          borderTop: "1px solid var(--border)",
          background: "rgba(30,106,109,0.03)",
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Noticias
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>
            Novedades, documentación de campo y aprendizajes del corredor.
          </p>
          <AnimatedDiv>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {articulos.map((a) => (
              <Link
                key={a.slug}
                href={`/bitacora/${a.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article className="bird-card" style={{ cursor: "pointer" }}>
                  <div style={{ position: "relative", height: "200px" }}>
                    <Image
                      src={a.imagen}
                      alt={a.titulo}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      className="slide-tag"
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        zIndex: 2,
                      }}
                    >
                      {a.categoria}
                    </span>
                  </div>
                  <div className="bird-info">
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.82rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Calendar size={13} /> {a.fechaFormateada}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.82rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Clock size={13} /> {a.tiempoLectura}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontFamily: "var(--font-heading)",
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.2",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {a.titulo}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--text-muted)",
                        margin: "0 0 1rem 0",
                        lineHeight: "1.6",
                        flexGrow: 1,
                      }}
                    >
                      {a.resumen.length > 115
                        ? a.resumen.substring(0, 115) + "..."
                        : a.resumen}
                    </p>
                    <span
                      className="text-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.88rem",
                        marginTop: 0,
                      }}
                    >
                      Leer <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          </AnimatedDiv>
        </div>
      </section>
    </>
  );
}
