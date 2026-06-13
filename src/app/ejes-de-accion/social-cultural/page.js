import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Eje Social y Cultural",
  description: "Vinculación comunitaria y festivales ecológicos en el Corredor Biológico Bosque Las Madres.",
};

export default function SocialCulturalPage() {
  return (
    <div className="eje-page">
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/generadas/eje_social.png" alt="Social y Cultural" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Eje Social y Cultural</h1>
          <p>Promoviendo la identidad y las expresiones artísticas vinculadas a la naturaleza.</p>
        </div>
      </section>

      <section className="section-light content-section">
        <div className="container container-narrow">
          <Link href="/sobre-el-corredor" className="btn-back" style={{ marginBottom: '2rem' }}>
            ← Volver a Ejes de Acción
          </Link>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Vinculación Comunitaria</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Nuestro Eje Social y Cultural busca empoderar a los habitantes de Matama y Valle de la Estrella, reconociéndolos como los verdaderos guardianes del bosque. Organizamos actividades que rescatan la herencia cultural local y la conectan íntimamente con la conservación de nuestra biodiversidad.
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            A través de festivales ecológicos, ecoferias, y encuentros artísticos, creamos espacios donde la comunidad celebra la riqueza de su entorno natural, fomentando un profundo sentido de pertenencia y orgullo por el Corredor Biológico Bosque Las Madres.
          </p>
        </div>
      </section>
    </div>
  );
}
