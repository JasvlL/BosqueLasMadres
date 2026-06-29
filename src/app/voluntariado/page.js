"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Voluntariado() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      alert("Por favor, completa todos los campos requeridos.");
    } else {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      console.log("Datos de voluntariado recibidos:", data);
      alert(
        "¡Gracias por tu interés! Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto."
      );
      form.reset();
      setValidated(false);
      return;
    }
    setValidated(true);
  };

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
    <div className="section-light">
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/generadas/eje_educativo_1782529755800.jpg" alt="Voluntariado en el corredor" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Programa de Voluntariado</h1>
          <p>
            Súmate al equipo local para apoyar los inventarios científicos de aves,
            mantenimiento ecológico de senderos y educación comunitaria en Limón.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "4rem 0" }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link> / <span>Voluntariado</span>
        </nav>

        <motion.section 
          className="content-section"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>¿Qué es el Programa de Voluntariado?</motion.h2>
          <motion.p variants={fadeInUp}>
            El programa de voluntariado del Corredor Biológico Bosque Las Madres
            ofrece oportunidades para que personas comprometidas con la
            conservación participen activamente en nuestros proyectos y
            actividades.
          </motion.p>
        </motion.section>

        <motion.section 
          className="content-section"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>Requisitos</motion.h2>
          <motion.ul variants={fadeInUp} className="requirements-list">
            <li>Mayor de 18 años (o con autorización de padres/tutores)</li>
            <li>Interés en la conservación y educación ambiental</li>
            <li>Disponibilidad de tiempo según el proyecto</li>
            <li>Compromiso y responsabilidad</li>
            <li>Buen estado físico (para algunas actividades)</li>
          </motion.ul>
        </motion.section>

        <motion.section 
          className="content-section"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>Beneficios de Participar</motion.h2>
          <div className="benefits-grid">
            <motion.div variants={fadeInUp} className="benefit-card hover:shadow-xl transition-shadow" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)'}}>
              <h3>Experiencia Práctica</h3>
              <p>Obtén experiencia práctica en conservación y educación ambiental</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="benefit-card hover:shadow-xl transition-shadow" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)'}}>
              <h3>Conocimiento</h3>
              <p>Aprende sobre biodiversidad, ecosistemas y especies locales</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="benefit-card hover:shadow-xl transition-shadow" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)'}}>
              <h3>Impacto Positivo</h3>
              <p>Contribuye directamente a la conservación del corredor biológico</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="benefit-card hover:shadow-xl transition-shadow" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)'}}>
              <h3>Comunidad</h3>
              <p>Conoce personas con intereses similares y forma parte de una comunidad</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="content-section"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>Actividades Disponibles</motion.h2>
          <div className="info-card-grid">
            <motion.div variants={fadeInUp} className="info-card hover:-translate-y-2 transition-transform">
              <h3>Monitoreo de Aves</h3>
              <p style={{ margin: 0 }}>Participa en el monitoreo y registro de especies de aves en el corredor.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="info-card hover:-translate-y-2 transition-transform">
              <h3>Mantenimiento de Senderos</h3>
              <p style={{ margin: 0 }}>Ayuda en el mantenimiento y limpieza de los senderos del corredor.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="info-card hover:-translate-y-2 transition-transform">
              <h3>Educación Ambiental</h3>
              <p style={{ margin: 0 }}>Colabora en actividades educativas con visitantes y estudiantes.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="info-card hover:-translate-y-2 transition-transform">
              <h3>Investigación</h3>
              <p style={{ margin: 0 }}>Participa en proyectos de investigación sobre biodiversidad.</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="content-section" style={{ marginBottom: 0 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Formulario de Inscripción</h2>
          <form
            className={`volunteer-form ${validated ? "was-validated" : ""}`}
            id="volunteer-form"
            onSubmit={handleSubmit}
            noValidate
            style={{background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(24px)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--shadow-lg)'}}
          >
            <fieldset>
              <legend>Datos Personales</legend>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input type="text" id="nombre" name="nombre" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input type="tel" id="telefono" name="telefono" required />
              </div>
              <div className="form-group">
                <label htmlFor="edad">Edad *</label>
                <input type="number" id="edad" name="edad" min="18" required />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <textarea id="direccion" name="direccion" rows="3"></textarea>
              </div>
            </fieldset>

            <fieldset>
              <legend>Disponibilidad</legend>
              <div className="form-group">
                <label htmlFor="disponibilidad">Disponibilidad de Tiempo *</label>
                <select id="disponibilidad" name="disponibilidad" required>
                  <option value="">Seleccione una opción</option>
                  <option value="completa">Tiempo completo</option>
                  <option value="parcial">Tiempo parcial</option>
                  <option value="fines-semana">Fines de semana</option>
                  <option value="esporadico">Esporádico</option>
                </select>
              </div>
              <div className="form-group">
                <label>Días Disponibles *</label>
                <div className="checkbox-group">
                  <label className="checkbox-label"><input type="checkbox" name="dias" value="lunes" /> Lunes</label>
                  <label className="checkbox-label"><input type="checkbox" name="dias" value="martes" /> Martes</label>
                  <label className="checkbox-label"><input type="checkbox" name="dias" value="miercoles" /> Miércoles</label>
                  <label className="checkbox-label"><input type="checkbox" name="dias" value="jueves" /> Jueves</label>
                  <label className="checkbox-label"><input type="checkbox" name="dias" value="viernes" /> Viernes</label>
                  <label className="checkbox-label"><input type="checkbox" name="dias" value="sabado" /> Sábado</label>
                  <label className="checkbox-label"><input type="checkbox" name="dias" value="domingo" /> Domingo</label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Intereses</legend>
              <div className="form-group">
                <label>Áreas de Interés *</label>
                <div className="checkbox-group">
                  <label className="checkbox-label"><input type="checkbox" name="intereses" value="monitoreo" /> Monitoreo de Aves</label>
                  <label className="checkbox-label"><input type="checkbox" name="intereses" value="mantenimiento" /> Mantenimiento de Senderos</label>
                  <label className="checkbox-label"><input type="checkbox" name="intereses" value="educacion" /> Educación Ambiental</label>
                  <label className="checkbox-label"><input type="checkbox" name="intereses" value="investigacion" /> Investigación</label>
                  <label className="checkbox-label"><input type="checkbox" name="intereses" value="fotografia" /> Fotografía</label>
                  <label className="checkbox-label"><input type="checkbox" name="intereses" value="otro" /> Otro</label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Motivación</legend>
              <div className="form-group">
                <label htmlFor="motivacion">¿Por qué deseas participar como voluntario? *</label>
                <textarea id="motivacion" name="motivacion" rows="5" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="experiencia">Experiencia previa (opcional)</label>
                <textarea id="experiencia" name="experiencia" rows="4"></textarea>
              </div>
            </fieldset>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="acepta" required /> Acepto los
                términos y condiciones del programa de voluntariado *
              </label>
            </div>

            <motion.button 
              type="submit" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar Solicitud
            </motion.button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}

