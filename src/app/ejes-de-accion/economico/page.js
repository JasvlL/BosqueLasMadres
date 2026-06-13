import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Eje Económico",
  description: "Promoción de prácticas productivas sostenibles y turismo comunitario.",
};

export default function EconomicoPage() {
  return (
    <div className="eje-page">
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/generadas/eje_economico.png" alt="Económico" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Eje Económico</h1>
          <p>Desarrollo sostenible e impulso a productores locales.</p>
        </div>
      </section>

      <section className="section-light content-section">
        <div className="container container-narrow">
          <Link href="/sobre-el-corredor" className="btn-back" style={{ marginBottom: '2rem' }}>
            ← Volver a Ejes de Acción
          </Link>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Prácticas Productivas Sostenibles</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            La conservación no puede estar separada del bienestar de quienes habitan el territorio. El Eje Económico apoya a los agricultores locales y emprendedores en la transición hacia prácticas agroecológicas que respeten los suelos y la fauna.
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            Impulsamos iniciativas de turismo ecológico y comunitario, permitiendo que la naturaleza misma sea una fuente de ingresos sostenibles, valorizando los bosques en pie y creando oportunidades justas para las familias del Corredor.
          </p>
        </div>
      </section>
    </div>
  );
}
