"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ConteoAves2024() {
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
    <div className="conteo-page">
      <section className="hero-page" style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          className="hero-page-bg"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        >
          <Image src="/assets/images/generadas/conteo_aves_hero_1782529803938.jpg" alt="Conteo de Aves" fill priority style={{ objectFit: 'cover' }} />
        </motion.div>
        <motion.div 
          className="hero-page-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <h1>Sistematización del Conteo de Aves 2024</h1>
          <p>Documento de divulgación basado en el trabajo comunitario y científico ciudadano del conteo realizado en octubre de 2024.</p>
        </motion.div>
      </section>

      <section className="section-light content-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container container-narrow">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link> / <span>Conteo de aves 2024</span>
          </nav>

          <motion.section 
            className="content-section" style={{ paddingTop: 0 }}
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeInUp}>¿Por qué importan los corredores biológicos y los conteos de aves?</motion.h2>
            <motion.p variants={fadeInUp}>
              Los corredores biológicos son territorios que conectan áreas silvestres
              protegidas, paisajes, ecosistemas y hábitats para mantener la
              biodiversidad y los procesos ecológicos. Costa Rica cuenta con{" "}
              <strong>52 corredores biológicos</strong>, que representan casi un{" "}
              <strong>33&nbsp;% del territorio continental</strong>, según el SINAC.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Registrar las especies que habitan estos espacios permite entender
              mejor la <strong>salud de los ecosistemas</strong> y, con el tiempo,
              analizar si hay cambios en la abundancia o presencia de especies. En
              un contexto de <strong>crisis climática y presiones sobre el territorio</strong>
              , esa línea base es una herramienta valiosa para la gestión y la
              educación.
            </motion.p>
          </motion.section>

          <motion.section 
            className="content-section"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeInUp}>Antecedentes del Corredor Biológico Bosque Las Madres</motion.h2>
            <motion.p variants={fadeInUp}>
              El CBBM se ubica en los distritos de <strong>Matama</strong> y{" "}
              <strong>Valle de la Estrella</strong>, cantón y provincia de{" "}
              <strong>Limón</strong>, dentro del ámbito de la{" "}
              <strong>Área de Conservación La Amistad Caribe (ACLAC)</strong>.
            </motion.p>
            <motion.p variants={fadeInUp}>
              <strong>Límites generales:</strong> al norte, la cuenca del río Banano;
              al oeste, la Zona Protectora Río Banano; al este, el mar Caribe; al
              sureste, el Refugio de Vida Silvestre Aviarios del Caribe (Santuario de
              Perezosos) y la margen norte de la desembocadura del río Estrella; al
              sur, la Reserva Indígena Tayní y la cuenca del río Estrella.
            </motion.p>
            <motion.p variants={fadeInUp}>
              En <strong>abril de 2023</strong> se realizó la primera ecoferia o
              festival del corredor biológico, con gran acogida. A partir de ahí, el{" "}
              <strong>comité local</strong> propuso organizar un{" "}
              <strong>conteo de aves</strong> para generar el primer inventario
              regional, articulando ciencia ciudadana con{" "}
              <strong>intervenciones artísticas y culturales</strong> y la
              participación de la comunidad.
            </motion.p>
          </motion.section>

          <motion.section 
            className="content-section"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeInUp}>Quiénes hicieron posible el conteo</motion.h2>
            <motion.p variants={fadeInUp}>Participaron diversos aliados clave:</motion.p>
            <motion.ul variants={fadeInUp} className="partners-list" style={{ paddingLeft: "1.5rem", lineHeight: "1.8" }}>
              <li><strong>Selva Bananito Experience:</strong> alojamiento y alimentación para observadores de aves y funcionarios del SINAC.</li>
              <li><strong>Work With Nature:</strong> apoyo en el conteo de aves.</li>
              <li><strong>Niños y Aves:</strong> actividades sociales el día posterior al conteo, integrando a niñez y comunidad.</li>
              <li><strong>Fundación Cuencas de Limón:</strong> financiamiento de acciones, alimentación comunitaria.</li>
              <li><strong>The Dallas World Aquarium:</strong> recursos para acciones del Santuario de Perezosos.</li>
              <li><strong>Sloth Sanctuary Costa Rica:</strong> hospedaje y apoyo logístico.</li>
              <li><strong>Programa Nacional de Corredores Biológicos de Costa Rica.</strong></li>
              <li><strong>Área de Conservación La Amistad Caribe (ACLAC) y SINAC.</strong></li>
              <li><strong>Naturalista CR e eBird.</strong></li>
            </motion.ul>
          </motion.section>

          <motion.section 
            className="content-section"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeInUp}>Resultados del conteo</motion.h2>
            <motion.p variants={fadeInUp}>
              Al cerrar las listas, el equipo se reunió en Selva Bananito. Por
              problemas de conexión, el “rezo” de especies se hizo de forma manual:
              con la guía de identificación se nombraron las especies y los equipos
              confirmaron si las habían visto, mientras se digitaba en computadora.
              El resultado consolidado fue de <strong>180 especies</strong> entre
              todas las rutas.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-note">
              El inventario en línea del CBBM presenta fichas sistematizadas para{" "}
              <strong>177 especies</strong>; la cifra de 180 corresponde al conteo
              de campo unificado ese fin de semana.
            </motion.p>
          </motion.section>

          <motion.section 
            className="content-section highlight-box" 
            style={{ marginBottom: 0 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Inventario en línea</h2>
            <p>
              En este sitio puede explorar la <strong>sección Fauna</strong> con
              fichas, fotografías y enlaces de verificación. El trabajo de campo y
              la sistematización continúan siendo un esfuerzo colectivo del CBBM.
            </p>
            <p style={{ margin: 0 }}>
              <Link href="/aves" className="btn btn-primary">
                Ver fauna
              </Link>
            </p>
          </motion.section>
        </div>
      </section>
    </div>
  );
}
