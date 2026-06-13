import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Eje Ambiental",
  description: "Conservación de cuencas hidrográficas y protección de la conectividad forestal.",
};

export default function AmbientalPage() {
  return (
    <div className="eje-page">
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/generadas/eje_ambiental.png" alt="Ambiental" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Eje Ambiental</h1>
          <p>Conservando nuestros ecosistemas, fuentes de agua y biodiversidad.</p>
        </div>
      </section>

      <section className="section-light content-section">
        <div className="container container-narrow">
          <Link href="/sobre-el-corredor" className="btn-back" style={{ marginBottom: '2rem' }}>
            ← Volver a Ejes de Acción
          </Link>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Protección y Conectividad</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            El corazón de nuestro corredor es la protección del medio ambiente. Este eje se enfoca en la conservación activa de los ecosistemas forestales y la protección de las vitales cuencas hidrográficas que sustentan la vida en Limón.
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            Trabajamos en proyectos de reforestación, limpieza de ríos y monitoreo de la salud del bosque para garantizar que la conectividad biológica entre las áreas protegidas y la costa se mantenga fuerte, resiliente y llena de vida.
          </p>
        </div>
      </section>
    </div>
  );
}
