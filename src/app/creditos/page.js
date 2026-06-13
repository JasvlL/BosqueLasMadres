import Link from "next/link";

export const metadata = {
  title: "Créditos",
  description:
    "Agradecimientos, colaboradores y créditos de desarrollo del sitio web del Corredor Biológico Bosque Las Madres.",
};

export default function Creditos() {
  return (
    <div className="section-light" style={{ padding: "4rem 0" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link> / <span>Créditos</span>
        </nav>

        {/* Título de la Página */}
        <h1 className="page-title">Créditos y Agradecimientos</h1>

        <section className="content-section">
          <h2>Agradecimientos</h2>
          <p>
            El conteo de aves de 2024 y las acciones del Corredor Biológico Bosque
            Las Madres son resultado del trabajo del <strong>comité local</strong>
            , de observadores voluntarios y de instituciones que aportaron
            recursos, logística y difusión. ¡Gracias a todas las personas que
            hicieron posible la jornada en campo y la actividad con la comunidad!
          </p>
        </section>

        <section className="content-section">
          <h2>Coordinación</h2>
          <div className="credits-grid">
            <div className="credit-item">
              <h3>Sofia Stein</h3>
              <p className="credit-role">
                Coordinadora del Corredor Biológico Bosque Las Madres
              </p>
              <p>Contacto: sofiastein1@gmail.com · 8723 4884</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>Instituciones y organizaciones aliadas (conteo y corredor)</h2>
          <ul className="institutions-list" style={{ paddingLeft: "1.5rem", lineHeight: "1.8" }}>
            <li>
              <strong>Selva Bananito Experience</strong> — alojamiento y alimentación
              para observadores y funcionarios del SINAC.
            </li>
            <li>
              <strong>Work With Nature</strong> — apoyo en el conteo de aves.
            </li>
            <li>
              <strong>Niños y Aves</strong> — actividades sociales y comunitarias con
              enfoque en observación de aves.
            </li>
            <li>
              <strong>Fundación Cuencas de Limón</strong> — financiamiento de
              acciones, alimentación comunitaria y apoyo a hospedaje.
            </li>
            <li>
              <strong>The Dallas World Aquarium</strong> — recursos para acciones del
              Santuario de Perezosos.
            </li>
            <li>
              <strong>Sloth Sanctuary Costa Rica</strong> — hospedaje y apoyo
              logístico.
            </li>
            <li>
              <strong>Programa Nacional de Corredores Biológicos de Costa Rica</strong>
              .
            </li>
            <li>
              <strong>Área de Conservación La Amistad Caribe (ACLAC) y SINAC</strong>{" "}
              — personal, logística y transporte.
            </li>
            <li>
              <strong>Naturalista CR (iNaturalist Costa Rica)</strong> — difusión en
              redes.
            </li>
            <li>
              <strong>The Cornell Lab of Ornithology</strong> — herramientas de
              identificación (Merlin).
            </li>
            <li>
              <strong>eBird</strong> — plataforma para listas y ciencia ciudadana.
            </li>
            <li>
              <strong>Universidad de Magallanes</strong> — apoyo en campo y
              sistematización del inventario.
            </li>
            <li>
              <strong>Liceo Capitán Ramón Rivas</strong> — grupo de danza, mensajes
              sobre servicios ecosistémicos de las aves y exposición pictórica.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Equipos de ruta (conteo 2024)</h2>
          <p>
            Participaron observadores en Selva Bananito, Ruta Burrico, San Clemente
            y Aviarios del Caribe, entre ellos: Justo López, Yerry, Constanza
            Lillo, Jean Carlos, Marteen van der Beek, Justo Barqueros, Pedro Porras,
            Gabriel Naranjo, Carlos Solano, Eyder Fonseca, Briyan Pérez, Mercedes
            Alpízar, Nacho, Alex Chávez, Julio Barquero y otras personas que sumaron
            al registro y a la organización. El detalle de la logística aparece en{" "}
            <Link href="/conteo-aves-2024">Conteo 2024</Link>.
          </p>
        </section>

        <section className="content-section">
          <h2>Fuentes de información en línea</h2>
          <ul className="sources-list credits-sources">
            <li>
              <a
                href="https://www.sinac.go.cr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--primary)", fontWeight: "600" }}
              >
                SINAC
              </a>{" "}
              — Sistema Nacional de Áreas de Conservación.
            </li>
            <li>
              <a href="https://ebird.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", fontWeight: "600" }}>
                eBird
              </a>{" "}
              — listas y datos del conteo.
            </li>
            <li>
              <a
                href="https://www.allaboutbirds.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--primary)", fontWeight: "600" }}
              >
                All About Birds
              </a>{" "}
              /{" "}
              <a
                href="https://merlin.allaboutbirds.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--primary)", fontWeight: "600" }}
              >
                Merlin
              </a>{" "}
              — identificación.
            </li>
            <li>
              <a
                href="https://www.inaturalist.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--primary)", fontWeight: "600" }}
              >
                iNaturalist
              </a>{" "}
              — ciencia ciudadana y Naturalista CR.
            </li>
          </ul>
        </section>

        {/* Sección: Desarrollo Web */}
        <section className="content-section" style={{ marginBottom: 0 }}>
          <h2>Desarrollo del Sitio Web</h2>
          <div className="developers-info">
            <p>
              <strong>Estudiantes:</strong> Gabriela Valverde, Jeferson Zelaya
            </p>
            <p>
              <strong>Programa:</strong> Informática Empresarial / TCU
            </p>
            <p>
              <strong>Año:</strong> 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
