import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { articulos, getArticuloPorSlug } from "@/data/articulos";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const articulo = getArticuloPorSlug(slug);
  if (!articulo) return { title: "Artículo no encontrado" };
  return {
    title: `${articulo.titulo} | Bitácora CBBM`,
    description: articulo.resumen,
  };
}

export default async function ArticuloPage({ params }) {
  const { slug } = await params;
  const articulo = getArticuloPorSlug(slug);
  if (!articulo) notFound();

  const relacionados = articulos.filter((a) => a.slug !== articulo.slug).slice(0, 2);

  return (
    <>
      <section className="hero-page" style={{ minHeight: "55vh" }}>
        <div className="hero-page-bg">
          <Image src={articulo.imagen} alt={articulo.titulo} fill priority />
        </div>
        <div className="hero-page-content">
          <span
            className="slide-tag"
            style={{ marginBottom: "1.5rem", display: "inline-block" }}
          >
            {articulo.categoria}
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            {articulo.titulo}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              marginTop: "1.5rem",
              flexWrap: "wrap",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <User size={15} /> {articulo.autor}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Calendar size={15} /> {articulo.fechaFormateada}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Clock size={15} /> {articulo.tiempoLectura} lectura
            </span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container-narrow">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link> /{" "}
            <Link href="/iniciativas">Iniciativas</Link> /{" "}
            <span>{articulo.titulo}</span>
          </nav>
          <Link
            href="/iniciativas"
            className="btn-back"
            style={{
              marginBottom: "2.5rem",
              display: "inline-flex",
              gap: "0.4rem",
              alignItems: "center",
            }}
          >
            <ArrowLeft size={16} /> Volver a Iniciativas
          </Link>
          <div style={{ marginTop: "1rem" }}>
            {articulo.contenido.map((bloque, i) => {
              if (bloque.tipo === "titulo") {
                return (
                  <h2
                    key={i}
                    style={{
                      fontSize: "1.65rem",
                      marginTop: "2.75rem",
                      marginBottom: "1rem",
                      color: "var(--primary)",
                    }}
                  >
                    {bloque.texto}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.9",
                    color: "var(--text)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {bloque.texto}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section
          className="content-section"
          style={{
            background: "rgba(30,106,109,0.04)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container">
            <h2 style={{ textAlign: "center", marginBottom: "2.5rem", fontSize: "1.75rem" }}>
              Más Noticias
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {relacionados.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/bitacora/${rel.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article className="bird-card" style={{ cursor: "pointer" }}>
                    <div style={{ position: "relative", height: "180px" }}>
                      <Image
                        src={rel.imagen}
                        alt={rel.titulo}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <span
                        className="slide-tag"
                        style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 2 }}
                      >
                        {rel.categoria}
                      </span>
                    </div>
                    <div className="bird-info">
                      <h3 style={{ fontSize: "1.1rem", fontFamily: "var(--font-heading)", color: "var(--primary)" }}>
                        {rel.titulo}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 }}>
                        {rel.resumen.substring(0, 110)}...
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
