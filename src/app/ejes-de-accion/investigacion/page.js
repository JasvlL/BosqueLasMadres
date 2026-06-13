import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Eje de Investigación",
  description: "Inventarios científicos de avifauna y base de datos de biodiversidad.",
};

export default function InvestigacionPage() {
  return (
    <div className="eje-page">
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/aves/Cyanocorax affinis.jpg" alt="Investigación" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Eje de Investigación y Monitoreo</h1>
          <p>Ciencia ciudadana para comprender y proteger nuestra biodiversidad.</p>
        </div>
      </section>

      <section className="section-light content-section">
        <div className="container container-narrow">
          <Link href="/sobre-el-corredor" className="btn-back" style={{ marginBottom: '2rem' }}>
            ← Volver a Ejes de Acción
          </Link>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Inventarios y Bases de Datos</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Las decisiones de conservación deben basarse en datos sólidos. A través del Eje de Investigación y Monitoreo, impulsamos inventarios científicos continuos, con un enfoque especial en la rica avifauna de nuestra región.
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            Promovemos la "ciencia ciudadana", involucrando a las comunidades en la recolección de datos, como los famosos conteos de aves, generando información crucial que guía nuestras estrategias ecológicas y aporta a las bases de datos de biodiversidad nacionales.
          </p>
        </div>
      </section>
    </div>
  );
}
