"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Bird, Globe2 } from "lucide-react";
import Carousel from "../components/Carousel";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="home-page bg-botanical-mist">
      {/* Hero Section */}
      <section className="hero-premium">
        {/* Imagen de fondo animada */}
        <div className="hero-bg-image"></div>

        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="hero-badge">
            Descubre la Naturaleza de Limón
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="hero-title">
            Bienvenidas y bienvenidos al Corredor Biológico Bosque Las Madres
          </motion.h2>

          <motion.p variants={fadeInUp} className="hero-description">
            Conservación y comunidad en Matama y Valle de la Estrella:
            biodiversidad del Caribe, conteo de aves y educación ambiental.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="hero-buttons">
            <Link href="/aves" className="btn btn-primary btn-icon">
              <Bird size={20} />
              <span>Explorar fauna</span>
              <ArrowRight size={20} className="arrow-icon" />
            </Link>
            <Link href="/sobre-el-corredor" className="btn btn-secondary glass-btn">
              Conoce más
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Secciones de Contenido */}
      <section className="about-section premium-padding">
        <div className="container">

          {/* Bloque 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: "flex", gap: "3rem", alignItems: "center", marginBottom: "4rem", flexWrap: "wrap" }}
          >
            <motion.div
              variants={fadeInUp}
              style={{ flex: "1 1 320px", borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: "360px" }}
            >
              <img
                src="/assets/images/aves/image2.jpeg"
                alt="Ecosistema del corredor"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              style={{
                flex: "1 1 320px",
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                borderTop: "4px solid var(--primary)",
                boxShadow: "0 16px 48px rgba(30,106,109,0.1)",
                padding: "2.5rem",
              }}
            >
              <div className="card-icon" style={{ background: "rgba(30,106,109,0.08)" }}>
                <Globe2 size={24} />
              </div>
              <h2 style={{ fontSize: "1.7rem", marginBottom: "1rem" }}>¿Qué es el Corredor Biológico?</h2>
              <p style={{ color: "var(--text)", lineHeight: "1.75", marginBottom: "1.25rem" }}>
                Es un territorio de conectividad ecológica en el Caribe sur de
                Limón, dentro del sistema de corredores biológicos de Costa Rica
                y el ámbito de la ACLAC. Aquí conviven bosques, cuencas
                hidrográficas, comunidades y áreas protegidas.
              </p>
              <Link href="/sobre-el-corredor" className="text-link">
                Conoce el corredor <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Bloque 2 — imagen a la derecha */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap-reverse" }}
          >
            <motion.div
              variants={fadeInUp}
              style={{
                flex: "1 1 320px",
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                borderTop: "4px solid var(--accent-amber)",
                boxShadow: "0 16px 48px rgba(30,106,109,0.1)",
                padding: "2.5rem",
              }}
            >
              <div className="card-icon" style={{ background: "rgba(207,174,112,0.12)" }}>
                <Leaf size={24} color="var(--accent-amber)" />
              </div>
              <h2 style={{ fontSize: "1.7rem", marginBottom: "1rem" }}>Nuestra Misión</h2>
              <p style={{ color: "var(--text)", lineHeight: "1.75", marginBottom: "1.25rem" }}>
                Promover la conservación de la biodiversidad del corredor
                biológico mediante la educación ambiental, la investigación
                científica y la participación comunitaria activa, tejiendo
                redes de cooperación y esperanza.
              </p>
              <Link href="/sobre-nosotros" className="text-link">
                Conoce al equipo <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              style={{ flex: "1 1 320px", borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: "360px" }}
            >
              <img
                src="/assets/images/mision.png"
                alt="Misión del corredor"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Sección: Enlaces Destacados */}
      <section className="featured-links premium-featured">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="featured-header"
          >
            <h2>Explora Nuestro Entorno</h2>
            <p>Descubre las distintas áreas y proyectos que dan vida al bosque y su comunidad.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Carousel />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
