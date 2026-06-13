import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sobre Nosotros - Corredor Biológico Bosque Las Madres",
  description:
    "Descubre la iniciativa comunitaria e institucional que impulsa la conservación y la educación ambiental en Limón, Costa Rica.",
};

export default function SobreNosotros() {
  return (
    <div className="sobre-nosotros-page">
      <style dangerouslySetInnerHTML={{__html: `
        .team-card { transition: all 0.3s ease; }
        .team-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(30, 106, 109, 0.15) !important; }
        .value-card-modern { transition: all 0.3s ease; }
        .value-card-modern:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(30, 106, 109, 0.1) !important; border-top-color: var(--accent-amber) !important; }
      `}} />
      
      {/* Sección Hero con imagen de fondo */}
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image 
            src="/assets/images/generadas/hero_paisaje.png" 
            alt="Paisaje Bosque Las Madres" 
            fill 
            priority
          />
        </div>
        
        <div className="hero-page-content">
          <h1>Conoce Nuestra Raíz</h1>
          <p>
            Comunidad, coordinación e instituciones aliadas uniendo esfuerzos para proteger la vida en el Corredor Biológico Bosque Las Madres en el Caribe Sur de Costa Rica.
          </p>
        </div>
      </section>

      {/* Sección Quiénes Somos (Grid Side by Side) */}
      <section className="section-light" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Nuestra Esencia y Propósito</h2>
              <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
                El <strong>Corredor Biológico Bosque Las Madres</strong> no es solo un territorio delimitado en un mapa; es una iniciativa comunitaria e institucional vibrante. Articulamos proyectos de conservación, educación ambiental y ciencia ciudadana en los distritos de Matama y Valle de la Estrella (Limón).
              </p>
              <p style={{ fontSize: '1.15rem', color: 'var(--text)' }}>
                Trabajamos en estrecha colaboración con el Programa Nacional de Corredores Biológicos y la ACLAC, tejiendo redes de esperanza para lograr un desarrollo verdaderamente sostenible en nuestra región del Caribe.
              </p>
            </div>
            <div style={{ position: 'relative', height: '450px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <Image 
                src="/assets/images/generadas/comunidad_bosque.png" 
                alt="Comunidad trabajando en la conservación" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Historia Reciente (Bloque Oscuro de Contraste) */}
      <section className="section-dark" style={{ padding: "6rem 0", backgroundColor: 'var(--primary-support)', color: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--accent-amber)', marginBottom: '2rem', fontSize: '2.5rem' }}>Hitos Recientes que Marcan el Camino</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', opacity: '0.95', lineHeight: '1.8' }}>
              En <strong>abril de 2023</strong>, dimos un paso gigante al realizar la primera ecoferia y festival del corredor biológico, un evento transformador que unió a la comunidad en una celebración de la naturaleza sin precedentes. 
            </p>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: '0.95', lineHeight: '1.8' }}>
              Esta energía nos impulsó a generar el primer inventario regional. El <strong>Conteo de Aves de 2024</strong> reunió a decenas de equipos y ciudadanos entusiastas en diversas rutas, entrelazando la observación científica rigurosa con hermosas expresiones artísticas y culturales locales.
            </p>
            <Link href="/conteo-aves-2024" className="btn btn-primary" style={{ backgroundColor: 'var(--accent-amber)', color: '#1C1B1A', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Revive la experiencia del Conteo 2024
            </Link>
          </div>
        </div>
      </section>

      {/* Sección: Equipo de Trabajo y Valores */}
      <section className="section-light" style={{ padding: "7rem 0 8rem 0" }}>
        <div className="container">
          
          {/* Liderazgo / Equipo */}
          <div style={{ marginBottom: '8rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '3.5rem', fontSize: '2.5rem' }}>Liderazgo y Coordinación</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="team-card" style={{ 
                background: '#fff', 
                borderRadius: 'var(--radius-lg)', 
                padding: '3rem 2rem', 
                boxShadow: 'var(--shadow-md)',
                maxWidth: '420px',
                width: '100%'
              }}>
                <div style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  margin: '0 auto 2rem auto',
                  position: 'relative',
                  border: '5px solid var(--accent-amber)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}>
                  <Image 
                    src="/assets/images/generadas/sofia_avatar.png" 
                    alt="Sofia Stein" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <h3 style={{ color: 'var(--primary-support)', marginBottom: '0.5rem', fontSize: '1.8rem' }}>Sofia Stein</h3>
                <p style={{ color: 'var(--secondary)', fontWeight: '600', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '0.05em' }}>
                  Coordinadora del Corredor Biológico
                </p>
                <div style={{ color: 'var(--text-muted)', fontSize: '1.05rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                  <p style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>📧</span> sofiastein1@gmail.com
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>📞</span> 8723 4884
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Valores y Objetivos */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '3.5rem', fontSize: '2.5rem' }}>Nuestros Pilares Fundamentales</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '2.5rem' 
            }}>
              {[
                { title: 'Conservación', icon: '🍃', desc: 'Proteger activamente la biodiversidad única y restaurar los ecosistemas frágiles y fuentes de agua del corredor.' },
                { title: 'Educación', icon: '📚', desc: 'Despertar la conciencia ecológica en las nuevas generaciones a través de dinámicos programas en escuelas.' },
                { title: 'Comunidad', icon: '🤝', desc: 'Empoderar a los habitantes locales como los verdaderos guardianes, guías y gestores de su entorno natural.' },
                { title: 'Sostenibilidad', icon: '♻️', desc: 'Impulsar alternativas económicas sostenibles y prácticas agrícolas que convivan en perfecta armonía con la vida silvestre.' },
              ].map((val, idx) => (
                <div key={idx} className="value-card-modern" style={{
                  padding: '3rem 2rem',
                  backgroundColor: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  borderTop: '5px solid var(--secondary)',
                  boxShadow: 'var(--shadow)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>{val.icon}</div>
                  <h3 style={{ color: 'var(--primary-support)', marginBottom: '1rem', fontSize: '1.6rem' }}>{val.title}</h3>
                  <p style={{ color: 'var(--text)', fontSize: '1.1rem', lineHeight: '1.6' }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
