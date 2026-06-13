"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import birdsData from "@/data/birds.json";
import faunaData from "@/data/fauna.json";

export default function Aves() {
  const [activeCategory, setActiveCategory] = useState(null); // 'mamiferos', 'aves', etc.
  
  // Estados de filtros
  const [searchName, setSearchName] = useState("");
  const [selectedOrden, setSelectedOrden] = useState("");
  const [selectedFamilia, setSelectedFamilia] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedHabitat, setSelectedHabitat] = useState("");

  // Estado de vista y paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  // Lista de Categorías de Biodiversidad
  const categories = [
    { id: "aves", name: "Aves", desc: "180 especies registradas", bg: "/assets/images/aves/Cyanocorax affinis.jpg" },
    { id: "mamiferos", name: "Mamíferos", desc: "Perezosos, monos y más", bg: "/assets/images/aves/image2.jpeg" },
    { id: "reptiles", name: "Reptiles", desc: "Lagartos y serpientes", bg: "/assets/images/aves/image1.png" },
    { id: "anfibios", name: "Anfibios", desc: "Ranas arborícolas del Caribe", bg: "/assets/images/vision.png" },
    { id: "plantas", name: "Plantas (Flora)", desc: "Heliconias y árboles nativos", bg: "/assets/images/mision.png" },
    { id: "hongos", name: "Hongos (Fungi)", desc: "Biodiversidad forestal", bg: "/assets/images/aves/image2.jpeg" },
  ];

  // Obtener los datos actuales según la categoría
  const currentData = useMemo(() => {
    if (activeCategory === "aves") return birdsData.birds || [];
    if (activeCategory === "mamiferos") return faunaData.mamiferos || [];
    if (activeCategory === "reptiles") return faunaData.reptiles || [];
    if (activeCategory === "anfibios") return faunaData.anfibios || [];
    if (activeCategory === "plantas") return faunaData.plantas || [];
    if (activeCategory === "hongos") return faunaData.hongos || [];
    return [];
  }, [activeCategory]);

  // Resetear filtros si cambiamos de categoría
  useEffect(() => {
    setSearchName("");
    setSelectedOrden("");
    setSelectedFamilia("");
    setSelectedColor("");
    setSelectedSize("");
    setSelectedHabitat("");
    setCurrentPage(1);
  }, [activeCategory]);

  // Extraer valores únicos para los dropdowns
  const filterOptions = useMemo(() => {
    const ordenes = new Set();
    const familias = new Set();
    const colores = new Set();

    currentData.forEach((item) => {
      if (item.orden) ordenes.add(item.orden);
      if (item.familia) familias.add(item.familia);
      if (item.colores) {
        item.colores.forEach((c) => colores.add(c.toLowerCase()));
      }
    });

    return {
      ordenes: Array.from(ordenes).sort(),
      familias: Array.from(familias).sort(),
      colores: Array.from(colores).sort(),
    };
  }, [currentData]);

  // Filtrar Datos
  const filteredData = useMemo(() => {
    return currentData.filter((item) => {
      if (searchName) {
        const query = searchName.toLowerCase();
        const matchesName =
          item.nombreComun?.toLowerCase().includes(query) ||
          item.nombreCientifico?.toLowerCase().includes(query) ||
          item.nombreIngles?.toLowerCase().includes(query);
        if (!matchesName) return false;
      }
      if (selectedOrden && item.orden !== selectedOrden) return false;
      if (selectedFamilia && item.familia !== selectedFamilia) return false;
      if (selectedColor) {
        const hasColor = item.colores?.some(
          (c) => c.toLowerCase() === selectedColor.toLowerCase()
        );
        if (!hasColor) return false;
      }
      if (selectedSize && item.tamaño !== selectedSize) return false;
      if (selectedHabitat) {
        const hasHabitat = item.habitat?.some(
          (h) => h.toLowerCase() === selectedHabitat.toLowerCase()
        );
        if (!hasHabitat) return false;
      }
      return true;
    });
  }, [
    currentData,
    searchName,
    selectedOrden,
    selectedFamilia,
    selectedColor,
    selectedSize,
    selectedHabitat,
  ]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleReset = (e) => {
    e.preventDefault();
    setSearchName("");
    setSelectedOrden("");
    setSelectedFamilia("");
    setSelectedColor("");
    setSelectedSize("");
    setSelectedHabitat("");
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {/* SECCIÓN HERO */}
      <section className="hero-page">
        <div className="hero-page-bg">
          <Image src="/assets/images/aves/image4.jpg" alt="Biodiversidad y Galería" fill priority />
        </div>
        <div className="hero-page-content">
          <h1>
            {activeCategory
              ? `${capitalize(activeCategory)} del Corredor`
              : "Biodiversidad del Corredor"}
          </h1>
          <p>
            {activeCategory
              ? `Listado e inventario detallado de la categoría de ${activeCategory}.`
              : "Explora la flora, fauna y hongos registrados a través de inventarios científicos en el Corredor Biológico Bosque Las Madres, o accede a nuestra galería de fotos."}
          </p>
        </div>
      </section>

      <div className="section-light content-section" style={{ padding: "4rem 0" }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <Link href="/">Inicio</Link> / <span>Biodiversidad</span>
            {activeCategory && (
              <>
                {" "}
                /{" "}
                <span
                  onClick={() => setActiveCategory(null)}
                  style={{ cursor: "pointer", color: "var(--primary)" }}
                >
                  Categorías
                </span>{" "}
                / <span>{capitalize(activeCategory)}</span>
              </>
            )}
          </nav>

        {/* VISTA POR DEFECTO: Porteros de Categorías (Idea 4) */}
        {!activeCategory && (
          <section className="biodiversity-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="biodiversity-card"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="action-card-bg"
                  style={{ backgroundImage: `url('${cat.bg}')` }}
                ></div>
                <div className="action-card-overlay"></div>
                <div className="action-card-content">
                  <h3>{cat.name}</h3>
                  <p>{cat.desc}</p>
                </div>
              </div>
            ))}
            
            {/* Tarjeta especial para la Galería Fotográfica */}
            <Link href="/galeria" className="biodiversity-card">
              <div
                className="action-card-bg"
                style={{ backgroundImage: "url('/assets/images/aves/image4.jpg')" }}
              ></div>
              <div className="action-card-overlay" style={{ background: "linear-gradient(to top, rgba(27, 166, 166, 0.95) 0%, rgba(27, 166, 166, 0.4) 60%, transparent 100%)" }}></div>
              <div className="action-card-content">
                <h3 style={{ color: "#ffffff" }}>📸 Galería de Fotos</h3>
                <p style={{ color: "#e3f2ef" }}>Explora capturas de paisajes y biodiversidad</p>
              </div>
            </Link>
          </section>
        )}

        {/* VISTA COMBINADA: Biodiversidad con Filtros (Aves, Mamíferos, Reptiles, Anfibios, Plantas, Hongos) */}
        {["aves", "mamiferos", "reptiles", "anfibios", "plantas", "hongos"].includes(activeCategory) && (
          <>
            <button
              onClick={() => setActiveCategory(null)}
              className="btn btn-secondary"
              style={{ marginBottom: "2rem" }}
            >
              ← Volver a Categorías
            </button>

            {/* Filtros de Búsqueda */}
            <section className="search-filters">
              <h2>Buscar especies</h2>
              <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="filter-row">
                  <div className="filter-group">
                    <label htmlFor="search-name">Buscar por nombre:</label>
                    <input
                      type="text"
                      id="search-name"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      placeholder="Nombre común, científico o en inglés..."
                    />
                  </div>
                </div>
                <div className="filter-row">
                  <div className="filter-group">
                    <label htmlFor="filter-orden">Orden:</label>
                    <select
                      id="filter-orden"
                      value={selectedOrden}
                      onChange={(e) => setSelectedOrden(e.target.value)}
                    >
                      <option value="">Todos los órdenes</option>
                      {filterOptions.ordenes.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label htmlFor="filter-familia">Familia:</label>
                    <select
                      id="filter-familia"
                      value={selectedFamilia}
                      onChange={(e) => setSelectedFamilia(e.target.value)}
                    >
                      <option value="">Todas las familias</option>
                      {filterOptions.familias.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="filter-row">
                  <div className="filter-group">
                    <label htmlFor="filter-color">Color:</label>
                    <select
                      id="filter-color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value="">Todos los colores</option>
                      {filterOptions.colores.map((c) => (
                        <option key={c} value={c}>
                          {capitalize(c)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label htmlFor="filter-size">Tamaño:</label>
                    <select
                      id="filter-size"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">Todos los tamaños</option>
                      <option value="pequeño">Pequeño</option>
                      <option value="mediano">Mediano</option>
                      <option value="grande">Grande</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label htmlFor="filter-habitat">Hábitat:</label>
                    <select
                      id="filter-habitat"
                      value={selectedHabitat}
                      onChange={(e) => setSelectedHabitat(e.target.value)}
                    >
                      <option value="">Todos los hábitats</option>
                      <option value="bosque">Bosque</option>
                      <option value="rio">Río</option>
                      <option value="arboles">Árboles</option>
                      <option value="suelo">Suelo</option>
                    </select>
                  </div>
                </div>
                <div className="filter-actions">
                  <button onClick={handleReset} className="btn btn-secondary">
                    Limpiar Filtros
                  </button>
                </div>
              </form>
              <div id="results-count" className="results-count">
                {filteredData.length} especie
                {filteredData.length !== 1 ? "s" : ""} encontrada
                {filteredData.length !== 1 ? "s" : ""}
              </div>
            </section>

            {/* Galería de Especies */}
            <section className="birds-gallery">
              {currentItems.length === 0 ? (
                <p className="no-results" style={{ textAlign: "center", margin: "3rem 0" }}>
                  No se encontraron especies con los criterios seleccionados.
                </p>
              ) : (
                <div className="birds-grid">
                  {currentItems.map((item) => (
                    <Link
                      href={activeCategory === "aves" ? `/aves/${item.id}` : `/fauna/${item.id}`}
                      key={item.id}
                      className="bird-card"
                    >
                      <img
                        src={item.imagen ? (item.imagen.startsWith('/') ? item.imagen : `/${item.imagen}`) : "/assets/images/aves/placeholder.jpg"}
                        alt={item.nombreComun}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23e8f5e9"/><text x="150" y="90" font-family="Arial" font-size="40" text-anchor="middle" fill="%234caf50">🐾</text><text x="150" y="130" font-family="Arial" font-size="13" text-anchor="middle" fill="%23666">Sin fotografía</text></svg>';
                        }}
                      />
                      <div className="bird-info">
                        {item.emblematica && (
                          <span className="emblematic-badge">⭐ Emblemática</span>
                        )}
                        <h3>{item.nombreComun}</h3>
                        <p className="scientific-name">
                          <em>{item.nombreCientifico}</em>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary pagination-btn"
                  >
                    Anterior
                  </button>
                  <span className="pagination-info">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary pagination-btn"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {/* VISTA 2 ELIMINADA: Plantas y Hongos ahora utilizan la vista combinada dinámica */}
      </div>
    </div>
    </>
  );
}
