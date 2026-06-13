import Link from "next/link";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <>
      {/* Hero Section (Fijo de Noche) */}
      <section className="hero">
        <div className="hero-content">
          <h2>
            Bienvenidas y bienvenidos al Corredor Biológico Bosque Las Madres
          </h2>
          <p>
            Conservación y comunidad en Matama y Valle de la Estrella (Limón):
            biodiversidad del Caribe, conteo de aves y educación ambiental.
          </p>
          <Link href="/aves" className="btn btn-primary">
            Explorar fauna
          </Link>
        </div>
      </section>

      {/* Secciones de Contenido: Diseño de Superposición Asimétrica en Zigzag */}
      <section className="about-section" style={{ padding: "8rem 0 5rem 0" }}>
        <div className="container">
          <div className="overlap-grid" style={{ margin: "0" }}>
            {/* Bloque 1: ¿Qué es el Corredor? */}
            <div className="overlap-item">
              <div className="overlap-image-wrapper">
                <img
                  src="/assets/images/aves/image2.jpeg"
                  alt="Ecosistema del Corredor Biológico Bosque Las Madres"
                  loading="lazy"
                />
              </div>
              <div className="overlap-text-card">
                <h2>¿Qué es el Corredor Biológico Bosque Las Madres?</h2>
                <p>
                  Es un territorio de conectividad ecológica en el Caribe sur de
                  Limón, dentro del sistema de corredores biológicos de Costa Rica
                  y el ámbito de la ACLAC. Aquí conviven bosques, cuencas
                  hidrográficas, comunidades y áreas protegidas. Trabajamos con
                  inventarios de aves —como el{" "}
                  <Link href="/conteo-aves-2024">conteo de 2024</Link>—, educación
                  y participación ciudadana para cuidar el ambiente que
                  compartimos.
                </p>
              </div>
            </div>

            {/* Bloque 2: Misión (Invertido) */}
            <div className="overlap-item reverse">
              <div className="overlap-image-wrapper">
                <img
                  src="/assets/images/mision.png"
                  alt="Misión del Corredor Biológico"
                  loading="lazy"
                />
              </div>
              <div className="overlap-text-card">
                <h2>Nuestra Misión</h2>
                <p>
                  Promover la conservation de la biodiversidad del corredor
                  biológico mediante la educación ambiental, la investigación
                  científica y la participación comunitaria activa, tejiendo
                  redes de cooperación y esperanza en beneficio de la naturaleza
                  y el bienestar local.
                </p>
              </div>
            </div>

            {/* Bloque 3: Visión */}
            <div className="overlap-item">
              <div className="overlap-image-wrapper">
                <img
                  src="/assets/images/vision.png"
                  alt="Visión del Corredor Biológico"
                  loading="lazy"
                />
              </div>
              <div className="overlap-text-card">
                <h2>Nuestra Visión</h2>
                <p>
                  Ser un referente en conservación, ciencia ciudadana y educación
                  ambiental en Costa Rica, contribuyendo al desarrollo sostenible
                  del Caribe Sur y asegurando la conectividad de los ecosistemas
                  para las futuras generaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Enlaces Destacados */}
      <section className="featured-links" style={{ padding: "5rem 0", position: "relative", zIndex: 2 }}>
        <div className="container" style={{ position: "relative" }}>
          <h2>Exploren Nuestro Sitio</h2>
          <Carousel />
        </div>
      </section>


    </>
  );
}
