"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function EjeTemplate({ 
  title, 
  subtitle, 
  heroImage, 
  intro,
  metrics,
  actions,
  quote,
  gallery 
}) {
  return (
    <div className="eje-page-template">
      {/* 1. HERO SECTION */}
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src={heroImage} alt={title} fill priority style={{ objectFit: 'cover' }} />
        </div>
        <div className="hero-page-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. INTRO Y MÉTRICAS */}
      <section className="section-intro">
        <div className="container container-narrow">
          <Link href="/sobre-el-corredor" className="btn-back">
            ← Volver a Ejes de Acción
          </Link>
          
          <div className="intro-text">
            <h2>Nuestra Misión en este Eje</h2>
            {intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {metrics && metrics.length > 0 && (
          <div className="container">
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <div className="metric-card" key={index}>
                  <div className="metric-icon">{metric.icon}</div>
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. NUESTRAS ACCIONES (ZIGZAG) */}
      {actions && actions.length > 0 && (
        <section className="section-actions">
          <div className="container">
            <h2 className="section-title text-center">Acciones Principales</h2>
            <div className="actions-list">
              {actions.map((action, index) => (
                <div className={`action-row ${index % 2 !== 0 ? 'reverse' : ''}`} key={index}>
                  <div className="action-image">
                    <div className="image-wrapper">
                      <Image src={action.image} alt={action.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div className="action-content">
                    <h3>{action.title}</h3>
                    <p>{action.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. CITA INSPIRADORA */}
      {quote && (
        <section className="section-quote">
          <div className="container container-narrow">
            <blockquote className="quote-box">
              <p>"{quote.text}"</p>
              <cite>— {quote.author}</cite>
            </blockquote>
          </div>
        </section>
      )}

      {/* 5. GALERÍA */}
      {gallery && gallery.length > 0 && (
        <section className="section-gallery">
          <div className="container">
            <h2 className="section-title text-center">Galería Visual</h2>
            <div className="gallery-grid">
              {gallery.map((img, index) => (
                <div className="gallery-item" key={index}>
                  <Image src={img} alt={`${title} galería ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA FINAL */}
      <section className="section-cta text-center">
        <div className="container container-narrow">
          <h2>¿Quieres ser parte del cambio?</h2>
          <p>Tu apoyo es fundamental para continuar con estos esfuerzos.</p>
          <div className="hero-buttons" style={{ marginTop: '2rem' }}>
            <Link href="/contacto" className="btn-primary">
              Contáctanos
            </Link>
            <Link href="/voluntariado" className="btn-secondary">
              Ser Voluntario
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .eje-page-template {
          background-color: var(--bg);
        }

        .btn-back {
          display: inline-block;
          margin-bottom: 3rem;
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          transition: var(--transition);
        }
        .btn-back:hover {
          color: var(--secondary);
          transform: translateX(-5px);
        }

        .section-intro {
          padding: 5rem 0;
          background: var(--bg);
        }

        .intro-text h2 {
          color: var(--primary);
          margin-bottom: 2rem;
          font-size: 2.2rem;
        }

        .intro-text p {
          font-size: 1.15rem;
          margin-bottom: 1.5rem;
          color: var(--text);
          line-height: 1.8;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .metric-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          text-align: center;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }
        .metric-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .metric-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }

        .metric-label {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 1.1rem;
        }

        .section-actions {
          padding: 5rem 0;
          background-color: var(--surface-alt);
        }

        .section-title {
          color: var(--primary);
          font-size: 2.5rem;
          margin-bottom: 4rem;
        }

        .action-row {
          display: flex;
          align-items: center;
          gap: 4rem;
          margin-bottom: 5rem;
        }
        .action-row.reverse {
          flex-direction: row-reverse;
        }

        .action-image, .action-content {
          flex: 1;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 75%; /* 4:3 Aspect Ratio */
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .action-content h3 {
          font-size: 2rem;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }
        .action-content p {
          font-size: 1.1rem;
          color: var(--text);
          line-height: 1.8;
        }

        .section-quote {
          padding: 6rem 0;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-support) 100%);
          color: #ffffff;
        }

        .quote-box {
          text-align: center;
        }
        .quote-box p {
          font-size: 2rem;
          font-style: italic;
          margin-bottom: 2rem;
          font-weight: 300;
          line-height: 1.4;
        }
        .quote-box cite {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--accent-amber);
        }

        .section-gallery {
          padding: 5rem 0;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .gallery-item {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .section-cta {
          padding: 6rem 0;
          background-color: var(--bg);
          border-top: 1px solid var(--border);
        }
        .section-cta h2 {
          font-size: 2.5rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .section-cta p {
          font-size: 1.2rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .action-row, .action-row.reverse {
            flex-direction: column;
            gap: 2rem;
          }
          .quote-box p {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
