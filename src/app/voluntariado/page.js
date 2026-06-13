"use client";

import { useState } from "react";
import Link from "next/link";

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

      // En un caso real, aquí enviaríamos los datos a una API
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

  return (
    <div className="section-light" style={{ padding: "4rem 0" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Inicio</Link> / <span>Voluntariado</span>
        </nav>

        {/* Título de la Página */}
        <h1 className="page-title">Programa de Voluntariado</h1>
        <p className="page-description">
          Súmate al equipo local para apoyar los inventarios científicos de aves,
          mantenimiento ecológico de senderos y educación comunitaria en Limón.
        </p>

        {/* Sección: Información del Programa */}
        <section className="content-section">
          <h2>¿Qué es el Programa de Voluntariado?</h2>
          <p>
            El programa de voluntariado del Corredor Biológico Bosque Las Madres
            ofrece oportunidades para que personas comprometidas con la
            conservación participen activamente en nuestros proyectos y
            actividades.
          </p>
        </section>

        {/* Sección: Requisitos */}
        <section className="content-section">
          <h2>Requisitos</h2>
          <ul className="requirements-list">
            <li>Mayor de 18 años (o con autorización de padres/tutores)</li>
            <li>Interés en la conservación y educación ambiental</li>
            <li>Disponibilidad de tiempo según el proyecto</li>
            <li>Compromiso y responsabilidad</li>
            <li>Buen estado físico (para algunas actividades)</li>
          </ul>
        </section>

        {/* Sección: Beneficios */}
        <section className="content-section">
          <h2>Beneficios de Participar</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Experiencia Práctica</h3>
              <p>
                Obtén experiencia práctica en conservación y educación ambiental
              </p>
            </div>
            <div className="benefit-card">
              <h3>Conocimiento</h3>
              <p>
                Aprende sobre biodiversidad, ecosistemas y especies locales
              </p>
            </div>
            <div className="benefit-card">
              <h3>Impacto Positivo</h3>
              <p>
                Contribuye directamente a la conservación del corredor biológico
              </p>
            </div>
            <div className="benefit-card">
              <h3>Comunidad</h3>
              <p>
                Conoce personas con intereses similares y forma parte de una
                comunidad
              </p>
            </div>
          </div>
        </section>

        {/* Sección: Actividades Disponibles */}
        <section className="content-section">
          <h2>Actividades Disponibles</h2>
          <div className="info-card-grid">
            <div className="info-card">
              <h3>Monitoreo de Aves</h3>
              <p style={{ margin: 0 }}>
                Participa en el monitoreo y registro de especies de aves en el
                corredor.
              </p>
            </div>
            <div className="info-card">
              <h3>Mantenimiento de Senderos</h3>
              <p style={{ margin: 0 }}>
                Ayuda en el mantenimiento y limpieza de los senderos del
                corredor.
              </p>
            </div>
            <div className="info-card">
              <h3>Educación Ambiental</h3>
              <p style={{ margin: 0 }}>
                Colabora en actividades educativas con visitantes y estudiantes.
              </p>
            </div>
            <div className="info-card">
              <h3>Investigación</h3>
              <p style={{ margin: 0 }}>
                Participa en proyectos de investigación sobre biodiversidad.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario de Inscripción */}
        <section className="content-section" style={{ marginBottom: 0 }}>
          <h2>Formulario de Inscripción</h2>
          <form
            className={`volunteer-form ${validated ? "was-validated" : ""}`}
            id="volunteer-form"
            onSubmit={handleSubmit}
            noValidate
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
                  <label className="checkbox-label">
                    <input type="checkbox" name="dias" value="lunes" /> Lunes
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="dias" value="martes" /> Martes
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="dias" value="miercoles" />{" "}
                    Miércoles
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="dias" value="jueves" /> Jueves
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="dias" value="viernes" /> Viernes
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="dias" value="sabado" /> Sábado
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="dias" value="domingo" /> Domingo
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Intereses</legend>
              <div className="form-group">
                <label>Áreas de Interés *</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="intereses" value="monitoreo" />{" "}
                    Monitoreo de Aves
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="intereses"
                      value="mantenimiento"
                    />{" "}
                    Mantenimiento de Senderos
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="intereses" value="educacion" />{" "}
                    Educación Ambiental
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="intereses" value="investigacion" />{" "}
                    Investigación
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="intereses" value="fotografia" />{" "}
                    Fotografía
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" name="intereses" value="otro" /> Otro
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Motivación</legend>
              <div className="form-group">
                <label htmlFor="motivacion">
                  ¿Por qué deseas participar como voluntario? *
                </label>
                <textarea
                  id="motivacion"
                  name="motivacion"
                  rows="5"
                  required
                ></textarea>
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

            <button type="submit" className="btn btn-primary">
              Enviar Solicitud
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
