"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, TreePine, Waves } from "lucide-react";
import Carousel from "../../components/Carousel";

export default function SobreElCorredor() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="section-light bg-ecosystem-mesh" style={{ padding: "4rem 0", minHeight: "100vh" }}>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link> / <span>Sobre el Corredor</span>
        </nav>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 variants={fadeInUp} className="page-title">Sobre el Corredor</motion.h1>
          <motion.p variants={fadeInUp} className="page-description">
            El Corredor Biológico Bosque Las Madres (CBBM) articula conservación,
            educación y participación comunitaria en el Caribe sur de Limón.
          </motion.p>
        </motion.div>

        <motion.section 
          className="content-section" 
          style={{ padding: "0 0 5rem 0", position: "relative", zIndex: 2 }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>Ejes de Acción</motion.h2>
          <motion.p variants={fadeInUp} style={{ marginBottom: "2.5rem", color: "var(--text-muted)", fontSize: "1.1rem" }}>
            Desliza para explorar nuestras áreas de enfoque estratégico en el territorio.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Carousel items={[
              { href: "/ejes-de-accion/social-cultural", bg: "url('/assets/images/generadas/eje_social.png')", title: "Social y Cultural", desc: "Vinculación comunitaria y festivales ecológicos" },
              { href: "/ejes-de-accion/ambiental", bg: "url('/assets/images/generadas/eje_ambiental.png')", title: "Ambiental", desc: "Conservación de cuencas y ecosistemas" },
              { href: "/ejes-de-accion/economico", bg: "url('/assets/images/generadas/eje_economico.png')", title: "Económico", desc: "Prácticas sostenibles y turismo ecológico" },
              { href: "/ejes-de-accion/educativo", bg: "url('/assets/images/generadas/eje_educativo_1782529755800.jpg')", title: "Educativo", desc: "Educación ambiental con escuelas locales" },
              { href: "/ejes-de-accion/investigacion", bg: "url('/assets/images/generadas/eje_investigacion_1782529765569.jpg')", title: "Investigación", desc: "Inventarios científicos de biodiversidad" }
            ]} />
          </motion.div>
        </motion.section>

        {/* IMPORTANCIA ECOLÓGICA */}
        <motion.section
          className="content-section"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ paddingTop: 0 }}
        >
          <motion.h2 variants={fadeInUp}>Importancia Ecológica y Social</motion.h2>
          <motion.div variants={fadeInUp} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
            {[
              { Icon: TreePine, titulo: "Conectividad", texto: "Mantiene corredores entre áreas protegidas y el mar Caribe, permitiendo el movimiento libre de fauna y la dispersión de semillas entre fragmentos de bosque." },
              { Icon: Waves, titulo: "Resiliencia Climática", texto: "Los ecosistemas del corredor regulan cuencas hidrográficas, capturan carbono y reducen la vulnerabilidad de las comunidades ante eventos climáticos extremos." },
              { Icon: CheckCircle, titulo: "Ciencia Ciudadana", texto: "Es espacio de identidad comunitaria, recreación sostenible y proyectos de monitoreo participativo que generan datos para la conservación regional." },
            ].map(({ Icon, titulo, texto }) => (
              <div key={titulo} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "4px solid var(--primary)", borderRadius: "var(--radius-md)", padding: "2rem", boxShadow: "var(--shadow)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <Icon size={22} color="var(--primary)" />
                  <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--primary)" }}>{titulo}</h3>
                </div>
                <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: "1.7", fontSize: "1rem" }}>{texto}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <div style={{ textAlign: "center", padding: "1rem 0 2rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Para ubicación geográfica, límites y normas de visita, consulta{" "}
            <Link href="/mapa" style={{ color: "var(--primary)", fontWeight: "600" }}>
              Mapa y Visita →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
