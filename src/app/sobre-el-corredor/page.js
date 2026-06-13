import Link from "next/link";
import Carousel from "../../components/Carousel";
export const metadata = {
  title: "Sobre el Corredor",
  description:
    "Ubicación, límites del CBBM en Limón, ecosistemas del Caribe, corredores biológicos en Costa Rica y ejes de acción.",
};

export default function SobreElCorredor() {
  return (
    <div className="section-light" style={{ padding: "4rem 0" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link> / <span>Sobre el Corredor</span>
        </nav>

        <h1 className="page-title">Sobre el Corredor</h1>
        <p className="page-description">
          El Corredor Biológico Bosque Las Madres (CBBM) articula conservación,
          educación y participación comunitaria en el Caribe sur de Limón.
        </p>

        <section className="content-section" style={{ padding: "0 0 5rem 0", position: "relative", zIndex: 2 }}>
          <h2>Ejes de Acción</h2>
          <p style={{ marginBottom: "2.5rem", color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Desliza para explorar nuestras áreas de enfoque estratégico en el territorio.
          </p>

          <Carousel items={[
            { href: "/ejes-de-accion/social-cultural", bg: "url('/assets/images/generadas/eje_social.png')", icon: "👥", title: "Social y Cultural", desc: "Vinculación comunitaria y festivales ecológicos" },
            { href: "/ejes-de-accion/ambiental", bg: "url('/assets/images/generadas/eje_ambiental.png')", icon: "🌿", title: "Ambiental", desc: "Conservación de cuencas y ecosistemas" },
            { href: "/ejes-de-accion/economico", bg: "url('/assets/images/generadas/eje_economico.png')", icon: "🌱", title: "Económico", desc: "Prácticas sostenibles y turismo ecológico" },
            { href: "/ejes-de-accion/educativo", bg: "url('/assets/images/aves/Claravis pretiosa.jpg')", icon: "📚", title: "Educativo", desc: "Educación ambiental con escuelas locales" },
            { href: "/ejes-de-accion/investigacion", bg: "url('/assets/images/aves/Cyanocorax affinis.jpg')", icon: "🔬", title: "Investigación", desc: "Inventarios científicos de biodiversidad" }
          ]} />
        </section>

        <section className="content-section">
          <h2>Ubicación y Límites Generales</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            El CBBM se ubica en los distritos de <strong>Matama</strong> y{" "}
            <strong>Valle de la Estrella</strong>, cantón y provincia de{" "}
            <strong>Limón</strong>, dentro del ámbito del{" "}
            <strong>Área de Conservación La Amistad Caribe (ACLAC)</strong>.
          </p>
          <ul style={{ lineHeight: "1.8", paddingLeft: "1.5rem" }}>
            <li>
              <strong>Norte:</strong> cuenca del río Banano.
            </li>
            <li>
              <strong>Oeste:</strong> Zona Protectora Río Banano.
            </li>
            <li>
              <strong>Este:</strong> mar Caribe.
            </li>
            <li>
              <strong>Sur-sureste:</strong> Refugio de Vida Silvestre Aviarios del
              Caribe (Santuario de Perezosos) y margen norte de la desembocadura del
              río Estrella.
            </li>
            <li>
              <strong>Sur:</strong> Reserva Indígena Tayní y cuenca del río Estrella.
            </li>
          </ul>
          <p style={{ marginTop: "1rem" }}>
            Consulte también el <Link href="/mapa">mapa de rutas</Link> para ver la distribución cartográfica.
          </p>
        </section>

        <section className="content-section">
          <h2>Importancia ecológica y social</h2>
          <p>
            El CBBM mantiene <strong>conectividad</strong> entre áreas protegidas y
            el mar, favorece el movimiento de especies y la resiliencia frente al
            cambio climático. Para las comunidades, es espacio de identidad,
            recreación sostenible y proyectos de ciencia ciudadana.
          </p>
        </section>

        <section className="content-section">
          <h2>Normas de Visita</h2>
          <div className="rules-list" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "2rem", backgroundColor: "var(--surface)" }}>
            <h3>Recomendaciones para Visitantes</h3>
            <ul style={{ marginTop: "0.5rem" }}>
              <li>Respetar los senderos marcados</li>
              <li>No extraer plantas, animales o recursos naturales</li>
              <li>No dejar basura</li>
              <li>Mantener silencio para no alterar la fauna</li>
              <li>No alimentar a los animales</li>
              <li>Respetar las áreas restringidas</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
