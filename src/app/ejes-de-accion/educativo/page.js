import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Eje Educativo",
  description: "Talleres de concienciación y educación ambiental con escuelas locales.",
};

export default function EducativoPage() {
  return (
    <div className="eje-page">
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/aves/Claravis pretiosa.jpg" alt="Educativo" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Eje Educativo</h1>
          <p>Sembrando conciencia en las nuevas generaciones.</p>
        </div>
      </section>

      <section className="section-light content-section">
        <div className="container container-narrow">
          <Link href="/sobre-el-corredor" className="btn-back" style={{ marginBottom: '2rem' }}>
            ← Volver a Ejes de Acción
          </Link>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Educación Ambiental</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            La educación es la herramienta más poderosa para la conservación a largo plazo. Desarrollamos talleres y programas dinámicos en las escuelas y colegios locales para enseñar a niños y jóvenes sobre la invaluable biodiversidad que les rodea.
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            Creemos que lo que se conoce se ama, y lo que se ama se protege. A través de salidas al campo, identificación de aves y charlas participativas, estamos formando a los futuros líderes ambientales de Limón.
          </p>
        </div>
      </section>
    </div>
  );
}
