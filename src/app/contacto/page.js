import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Contacto - Corredor Biológico Bosque Las Madres",
  description: "Información de contacto para actividades educativas, alianzas comunitarias y voluntariado.",
};

export default function Contacto() {
  return (
    <div className="contacto-page" style={{ paddingBottom: '6rem' }}>
      
      {/* Header Section */}
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/generadas/eje_social.png" alt="Contacto" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Hablemos de Conservación</h1>
          <p>
            Estamos aquí para colaborar. Contáctanos para actividades educativas, alianzas comunitarias, voluntariado o más información sobre nuestros proyectos en el Caribe Sur.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '800px' }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Inicio</Link> / <span>Contacto</span>
        </nav>
        
        {/* Coordinación Card */}
        <div style={{ backgroundColor: '#fff', padding: '4rem 3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', borderTop: '5px solid var(--accent-amber)', textAlign: 'center' }}>
          
          <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--surface-alt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 2rem auto' }}>
            📩
          </div>

          <h2 style={{ color: 'var(--primary-support)', marginBottom: '1rem', fontSize: '2.2rem' }}>Coordinación del Corredor</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Para consultas generales, propuestas de proyectos, y organización comunitaria.
          </p>

          <div style={{ display: 'inline-block', textAlign: 'left', backgroundColor: 'var(--bg)', padding: '2rem 3rem', borderRadius: 'var(--radius-md)' }}>
            <p style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong>Encargada:</strong> Sofia Stein
            </p>
            <p style={{ fontSize: '1.3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong>Email:</strong> <a href="mailto:sofiastein1@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>sofiastein1@gmail.com</a>
            </p>
            <p style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong>Teléfono:</strong> <a href="tel:+50687234884" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>+506 8723 4884</a>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <section style={{ textAlign: 'center', padding: '2rem', marginTop: '3rem', backgroundColor: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
          <p style={{ margin: 0, fontSize: '1rem' }}>
            <strong>Nota importante:</strong> Este canal es exclusivamente para la gestión de proyectos, educación y alianzas del Corredor Biológico Bosque Las Madres. <strong>No procesamos denuncias penales ambientales por esta vía.</strong> Si necesitas reportar un delito ambiental, por favor visita nuestra sección <Link href="/cuidar-naturaleza" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Cuidar la Naturaleza</Link> para conocer las líneas de emergencia oficiales del Estado.
          </p>
        </section>

      </div>
    </div>
  );
}
