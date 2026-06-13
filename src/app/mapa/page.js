"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";

export default function Mapa() {
  const [selectedZone, setSelectedZone] = useState("asp");
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const leafletMapRef = useRef(null);
  const markersRef = useRef({});

  const zonesInfo = {
    indigena: {
      title: "Zona Indígena Tayní",
      desc: "Territorio ancestral de la etnia Bribri en la cuenca del río Estrella. Su presencia e identidad cultural son parte del tejido social e histórico del corredor, colaborando en prácticas tradicionales de conservación y respeto a la biodiversidad.",
    },
    asp: {
      title: "ASP - Áreas Silvestres Protegidas",
      desc: "El corredor biológico sirve como puente entre grandes áreas protegidas del SINAC, como la Zona Protectora Río Banano y el Refugio de Vida Silvestre Aviarios del Caribe. Conectar estos parches permite el paso de fauna migratoria y el flujo genético.",
    },
    recarga: {
      title: "Zonas de Recarga Hídrica",
      desc: "Áreas forestales críticas en las partes medias y altas de las cuencas de los ríos Banano y Estrella. Absorben el agua de lluvia, regulan el caudal de los ríos y aseguran el abastecimiento de agua potable para Limón y las comunidades locales.",
    },
    protectora: {
      title: "Zona Protectora Limón",
      desc: "Área de amortiguamiento ecológico enfocada en la protección del recurso hídrico, suelos forestales y control de erosión. Alberga especies de flora y avifauna de vital importancia que son monitoreadas por el comité local.",
    },
  };

  useEffect(() => {
    if (!leafletLoaded || typeof window === "undefined" || !window.L) return;

    const L = window.L;

    // Si ya existe una instancia de mapa, no reinicializar
    if (leafletMapRef.current) return;

    // Solucionar el problema de las rutas de imágenes de los iconos de marcadores en Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    // Coordenadas centrales del polígono aproximado
    const initialCoords = [9.81, -82.99];
    const map = L.map("map", { scrollWheelZoom: false }).setView(initialCoords, 11);
    leafletMapRef.current = map;

    // Agregar capa base de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregar polígono sombreado aproximado del Corredor Biológico Bosque Las Madres
    const corridorBoundary = [
      [9.935, -83.025], // Banano
      [9.890, -83.080], // Matama oeste
      [9.720, -83.030], // Valle de la Estrella oeste
      [9.735, -82.980], // Tayní
      [9.780, -82.915], // Costa sur
      [9.799, -82.915], // Aviarios del Caribe
      [9.900, -82.970]  // Costa norte
    ];

    L.polygon(corridorBoundary, {
      color: "#1e6a6d",
      fillColor: "#1ba6a6",
      fillOpacity: 0.15,
      weight: 3,
      dashArray: "6, 6"
    }).addTo(map).bindPopup("<h4>Polígono de Conconectividad del CBBM</h4><p>Área de amortiguamiento y protección ambiental.</p>");

    // Pines de Zonas de Interés
    const markers = {
      indigena: L.marker([9.734, -83.022]).addTo(map).bindPopup(
        `<h3>Zona Indígena Tayní Bribri</h3>
         <p>Territorio indígena en las cuencas altas del río Estrella con prácticas forestales ancestrales.</p>`
      ),
      asp: L.marker([9.799, -82.915]).addTo(map).bindPopup(
        `<h3>ASP Aviarios del Caribe</h3>
         <p>Humedales costeros y refugio de perezosos en el extremo sur del corredor.</p>`
      ),
      recarga: L.marker([9.840, -83.025]).addTo(map).bindPopup(
        `<h3>Recarga Hídrica Selva Bananito</h3>
         <p>Bosques nubosos y de recarga fundamentales en la parte alta de la cuenca.</p>`
      ),
      protectora: L.marker([9.915, -83.030]).addTo(map).bindPopup(
        `<h3>Zona Protectora Río Banano</h3>
         <p>Región forestal protegida de la cuenca del Río Banano, fuente de agua de Limón.</p>`
      ),
    };

    markersRef.current = markers;

    // Marcadores circulares para las rutas de conteo adicionales
    L.circleMarker([9.815, -83.010], {
      radius: 6,
      color: "#f9a825",
      fillColor: "#f9a825",
      fillOpacity: 0.9
    }).addTo(map).bindPopup("<h4>Ruta Burrico</h4><p>Punto de inicio en la escuela rural para el conteo de aves.</p>");

    L.circleMarker([9.782, -82.934], {
      radius: 6,
      color: "#f9a825",
      fillColor: "#f9a825",
      fillOpacity: 0.9
    }).addTo(map).bindPopup("<h4>Ruta San Clemente</h4><p>Camino de monitoreo de avifauna comunitaria.</p>");

    // Abrir por defecto el popup de la zona seleccionada inicial (ASP)
    setTimeout(() => {
      if (markers.asp) {
        markers.asp.openPopup();
      }
    }, 500);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [leafletLoaded]);

  const handleZoneSelect = (zoneId) => {
    setSelectedZone(zoneId);

    if (!leafletMapRef.current || typeof window === "undefined" || !window.L) return;

    const coords = {
      indigena: [9.734, -83.022],
      asp: [9.799, -82.915],
      recarga: [9.840, -83.025],
      protectora: [9.915, -83.030]
    };

    const targetCoords = coords[zoneId];
    if (targetCoords) {
      // Volar al punto con transición suave
      leafletMapRef.current.flyTo(targetCoords, 13, {
        animate: true,
        duration: 1.5
      });

      // Abrir el popup correspondiente con un pequeño retraso
      const marker = markersRef.current[zoneId];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 1200);
      }
    }
  };

  return (
    <>
      {/* Carga dinámica de Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      {/* Carga dinámica de Leaflet JS */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        strategy="lazyOnload"
        onLoad={() => setLeafletLoaded(true)}
      />

      {/* SECCIÓN HERO */}
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/generadas/hero_paisaje.png" alt="Ubicación Geográfica" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>Ubicación y Rutas del Corredor</h1>
          <p>
            Visualización geográfica de los límites, senderos de monitoreo y zonas
            ecológicas de interés en el CBBM.
          </p>
        </div>
      </section>

      <div className="section-light content-section" style={{ padding: "4rem 0" }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <Link href="/">Inicio</Link> / <span>Ubicación Geográfica</span>
          </nav>

          {/* Selector de Zonas de Interés (Idea 6) */}
          <section className="content-section" style={{ padding: "0 0 3rem 0" }}>
            <h2>Zonas de Interés y Polígono</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Presiona sobre cualquiera de los botones para centrar el mapa interactivo y
              desplegar la información detallada del punto geográfico.
            </p>

            {/* Botones de Zonas */}
            <div className="map-tabs">
              <button
                onClick={() => handleZoneSelect("indigena")}
                className={`btn map-tab-btn ${selectedZone === "indigena" ? "btn-primary" : "btn-secondary"}`}
              >
                Zona Indígena
              </button>
              <button
                onClick={() => handleZoneSelect("asp")}
                className={`btn map-tab-btn ${selectedZone === "asp" ? "btn-primary" : "btn-secondary"}`}
              >
                Área Silvestre Protegida (ASP)
              </button>
              <button
                onClick={() => handleZoneSelect("recarga")}
                className={`btn map-tab-btn ${selectedZone === "recarga" ? "btn-primary" : "btn-secondary"}`}
              >
                Zona de Recarga Hídrica
              </button>
              <button
                onClick={() => handleZoneSelect("protectora")}
                className={`btn map-tab-btn ${selectedZone === "protectora" ? "btn-primary" : "btn-secondary"}`}
              >
                Zona Protectora Limón
              </button>
            </div>

            {/* Panel informativo dinámico */}
            {selectedZone && zonesInfo[selectedZone] && (
              <div className="map-info-panel">
                <h3>{zonesInfo[selectedZone].title}</h3>
                <p>{zonesInfo[selectedZone].desc}</p>
              </div>
            )}
          </section>

          {/* Mapa Dinámico con Leyenda (Idea 6) */}
          <section className="map-container" style={{ marginBottom: "3rem" }}>
            <h2>Mapa General de Rutas</h2>
            <div className="map-controls" style={{ marginTop: "1rem" }}>
              <div className="map-legend">
                <h3>Leyenda de Rutas</h3>
                <ul className="legend-list">
                  <li>
                    <span className="legend-icon observation" style={{ background: "#3388ff" }}></span> Puntos de
                    Interés (Zonas de Acción)
                  </li>
                  <li>
                    <span className="legend-icon trail"></span> Puntos de Conteo de Aves (Rutas)
                  </li>
                  <li>
                    <span className="legend-icon conservation" style={{ border: "2px dashed #1e6a6d", background: "rgba(27, 166, 166, 0.15)" }}></span> Límites del Polígono CBBM
                  </li>
                </ul>
              </div>
            </div>

            {/* Contenedor del Mapa de Leaflet */}
            <div id="map">
              {!leafletLoaded && (
                <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "1.1rem" }}>
                  Cargando mapa interactivo...
                </div>
              )}
            </div>
          </section>

          {/* Sección Comunidades */}
          <section className="content-section" style={{ padding: "0" }}>
            <h2>Comunidades del Territorio</h2>
            <p style={{ lineHeight: "1.7", color: "var(--text-muted)" }}>
              El polígono del Corredor Biológico Bosque Las Madres abarca un territorio
              activo y habitado por personas en diversas comunidades rurales y de paisaje
              productivo. Entre ellas destacan <strong>Burrico</strong>,{" "}
              <strong>Bananito Norte</strong>, <strong>Bananito Sur</strong>,{" "}
              <strong>San Clemente</strong> y la zona costera de <strong>Península</strong>.
              La participación de las juntas escolares, fincas locales y comités de agua
              de estas localidades es fundamental para la sostenibilidad de las rutas de
              monitoreo.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
