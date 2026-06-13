import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Cuidar la naturaleza",
  description:
    "Cómo ejercer tu derecho a un ambiente sano en Costa Rica: denuncias ambientales, emergencias y canales oficiales.",
};

export default function CuidarNaturaleza() {
  return (
    <div className="cuidar-naturaleza-page" style={{ paddingBottom: '6rem' }}>
      
      {/* Header Section */}
      <section className="hero-page">
        <div className="hero-page-bg">
          {/* Imagen representativa */}
          <Image src="/assets/images/generadas/eje_ambiental.png" alt="Cuidar la naturaleza" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Tu derecho a cuidar el ambiente</h1>
          <p>
            Información orientativa para la ciudadanía costarricense: qué hacer si
            observas una situación irregular, cómo documentarla y a qué instituciones acudir.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '4rem' }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/">Inicio</Link> / <span>Cuidar la naturaleza</span>
        </nav>
        
        {/* Derecho y Deber */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--accent-amber)' }}>
            <h2 style={{ color: 'var(--primary-support)', marginBottom: '1rem', fontSize: '1.8rem' }}>El Derecho a un Ambiente Sano</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text)' }}>
              En Costa Rica, la Constitución reconoce el <strong>derecho humano a un ambiente sano y ecológicamente equilibrado</strong>. Esto significa que todas y todos podemos exigir que se respeten las leyes ambientales y participar activamente en la protección de la biodiversidad, el agua y nuestros bosques.
            </p>
          </div>
          
          <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--accent-green)' }}>
            <h2 style={{ color: 'var(--primary-support)', marginBottom: '1rem', fontSize: '1.8rem' }}>Nuestro Deber de Actuar</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text)' }}>
              Cuidar no es solo evitar el daño, también implica <strong>reportar</strong>. Si observas tala ilegal, caza furtiva, contaminación de ríos o invasiones en zonas protegidas, tu deber ciudadano es notificarlo a las autoridades para proteger los espacios que compartimos.
            </p>
          </div>
        </div>

        {/* Seguridad */}
        <section style={{ backgroundColor: 'var(--surface-alt)', padding: '3rem', borderRadius: 'var(--radius-lg)', marginBottom: '5rem', borderLeft: '6px solid var(--primary)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '2rem' }}>⚠️ Antes de actuar: Tu seguridad es primero</h2>
          <ul style={{ fontSize: '1.1rem', paddingLeft: '2rem', lineHeight: '2' }}>
            <li><strong>No te expongas</strong> a confrontaciones directas; observa siempre desde una distancia segura.</li>
            <li>Si hay un riesgo inmediato para las personas, viviendas o la naturaleza (ej. incendios), llama inmediatamente al <strong style={{ color: 'red' }}>911</strong>.</li>
            <li>Si es seguro, documenta: toma fotografías, anota la fecha, la hora exacta y detalles del lugar. <strong>Nunca arriesgues tu vida por una foto.</strong></li>
          </ul>
        </section>

        {/* Directorio de Denuncias */}
        <h2 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Directorio de Denuncias</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {[
            { title: 'Emergencias 911', desc: 'Incendios forestales, violencia o delitos en curso que requieran bomberos o Fuerza Pública de inmediato.', color: '#d32f2f' },
            { title: 'Áreas Silvestres y SINAC', desc: 'Infracciones contra flora y fauna dentro y fuera de parques. Visita sinac.go.cr para interponer la denuncia oficial.', color: 'var(--primary)' },
            { title: 'Delitos Penales (OIJ)', desc: 'Caza furtiva, tráfico de especies o delitos mayores. Acudir a delegaciones del OIJ o fiscalías.', color: 'var(--accent-blue)' },
            { title: 'Agua y Minería (MINAE)', desc: 'Extracción ilegal de agua o materiales, pozos ilegales. Acude a la Dirección de Aguas del MINAE.', color: 'var(--accent-amber)' },
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', border: `2px solid ${item.color}`, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: item.color, marginBottom: '1rem', fontSize: '1.4rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text)', fontSize: '1rem', flexGrow: 1 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Preparar reporte */}
        <section style={{ backgroundColor: '#fff', padding: '4rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', marginBottom: '4rem' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '2.2rem', textAlign: 'center' }}>¿Cómo estructurar un reporte útil?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
            {[
              { num: '1', title: 'Ubicación', text: 'Distrito, nombre de la finca y referencias claras (un río, una escuela, etc.).' },
              { num: '2', title: 'Tiempo', text: 'Fecha y hora aproximada de los hechos.' },
              { num: '3', title: 'Hechos', text: 'Descripción clara de la actividad (tala, animales en jaulas, vertidos químicos).' },
              { num: '4', title: 'Evidencia', text: 'Fotos, videos o audios (obtenidos de forma segura). Nombres de testigos.' },
              { num: '5', title: 'Seguimiento', text: 'Solicita y guarda el número de expediente o trámite institucional.' },
            ].map((step, idx) => (
              <div key={idx} style={{ flex: '1 1 200px', textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--accent-green)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem auto' }}>{step.num}</div>
                <h3 style={{ color: 'var(--primary-support)', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.95rem' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section style={{ textAlign: 'center', padding: '2rem', border: '1px dashed var(--text-muted)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            <strong>Aviso Legal:</strong> Los teléfonos y trámites estatales pueden cambiar. Verifica siempre en los sitios oficiales (<a href="https://www.sinac.go.cr" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>sinac.go.cr</a>, <a href="https://www.minae.go.cr" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>minae.go.cr</a>) antes de presentar una denuncia formal. La plataforma iNaturalist sirve para ciencia ciudadana, pero <em>no reemplaza</em> una denuncia oficial.
          </p>
        </section>

      </div>
    </div>
  );
}
