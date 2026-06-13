import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Corredor Biológico Bosque Las Madres</h3>
            <p>Dedicados a la conservación y educación ambiental</p>
            {/* Botones de redes sociales minimalistas (Idea 1 & 2) */}
            <div className="social-buttons">
              <a
                href="https://facebook.com"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://instagram.com"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="https://youtube.com"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                🎥
              </a>
              <a
                href="https://twitter.com"
                className="social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                🐦
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li>
                <Link href="/sobre-nosotros">Sobre Nosotros</Link>
              </li>
              <li>
                <Link href="/sobre-el-corredor">Sobre el Corredor</Link>
              </li>
              <li>
                <Link href="/conteo-aves-2024">Conteo 2024</Link>
              </li>
              <li>
                <Link href="/cuidar-naturaleza">Cuidar la naturaleza</Link>
              </li>
              <li>
                <Link href="/aves">Fauna</Link>
              </li>
              <li>
                <Link href="/proyectos">Proyectos</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section" id="contacto">
            <h4>Contacto</h4>
            <p>Coordinadora: Sofia Stein</p>
            <p>Email: sofiastein1@gmail.com</p>
            <p>Teléfono: 8723 4884</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Corredor Biológico Bosque Las Madres. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
