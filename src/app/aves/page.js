"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import birdsData from "@/data/birds.json";
import faunaData from "@/data/fauna.json";

export default function Aves() {
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Estados de filtros
  const [searchName, setSearchName] = useState("");
  const [selectedOrden, setSelectedOrden] = useState("");
  const [selectedFamilia, setSelectedFamilia] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedHabitat, setSelectedHabitat] = useState("");

  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const categories = [
    { id: "aves", name: "Aves", desc: "180 especies registradas", bg: "/assets/images/aves/Cyanocorax affinis.jpg" },
    { id: "mamiferos", name: "Mamíferos", desc: "Perezosos, monos y más", bg: "/assets/images/aves/image2.jpeg" },
    { id: "reptiles", name: "Reptiles", desc: "Lagartos y serpientes", bg: "/assets/images/aves/image1.png" },
    { id: "anfibios", name: "Anfibios", desc: "Ranas arborícolas del Caribe", bg: "/assets/images/vision.png" },
    { id: "plantas", name: "Plantas (Flora)", desc: "Heliconias y árboles nativos", bg: "/assets/images/mision.png" },
    { id: "hongos", name: "Hongos (Fungi)", desc: "Biodiversidad forestal", bg: "/assets/images/aves/image2.jpeg" },
  ];

  const currentData = useMemo(() => {
    if (activeCategory === "aves") return birdsData.birds || [];
    if (activeCategory === "mamiferos") return faunaData.mamiferos || [];
    if (activeCategory === "reptiles") return faunaData.reptiles || [];
    if (activeCategory === "anfibios") return faunaData.anfibios || [];
    if (activeCategory === "plantas") return faunaData.plantas || [];
    if (activeCategory === "hongos") return faunaData.hongos || [];
    return [];
  }, [activeCategory]);

  useEffect(() => {
    setSearchName("");
    setSelectedOrden("");
    setSelectedFamilia("");
    setSelectedColor("");
    setSelectedSize("");
    setSelectedHabitat("");
    setCurrentPage(1);
  }, [activeCategory]);

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
  }, [currentData, searchName, selectedOrden, selectedFamilia, selectedColor, selectedSize, selectedHabitat]);

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

  const activeFilterCount = [selectedOrden, selectedFamilia, selectedColor, selectedSize, selectedHabitat].filter(Boolean).length;

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      {/* SECCIÓN HERO */}
      <section className="hero-page" style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          className="hero-page-bg"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        >
          <Image src="/assets/images/generadas/aves_hero_1782529832885.jpg" alt="Biodiversidad y Galería" fill priority style={{ objectFit: 'cover' }} />
        </motion.div>
        
        <motion.div 
          className="hero-page-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
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
        </motion.div>
      </section>

      <div className="section-light content-section bg-watercolor-paper" style={{ padding: "4rem 0" }}>
        <div className="container">
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

        {!activeCategory && (
          <motion.section 
            className="biodiversity-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat) => (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="biodiversity-card"
                style={{ cursor: "pointer", transition: 'box-shadow 0.3s', boxShadow: 'var(--shadow-md)' }}
              >
                <div
                  className="action-card-bg"
                  style={{ backgroundImage: `url('${cat.bg}')`, transition: 'transform 0.6s' }}
                ></div>
                <div className="action-card-overlay"></div>
                <div className="action-card-content">
                  <h3>{cat.name}</h3>
                </div>
              </motion.div>
            ))}
            
          </motion.section>
        )}

        <AnimatePresence mode="wait">
          {["aves", "mamiferos", "reptiles", "anfibios", "plantas", "hongos"].includes(activeCategory) && (
            <motion.div
              key="category-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setActiveCategory(null)}
                className="btn btn-secondary"
                style={{ marginBottom: "2rem" }}
              >
                ← Volver a Categorías
              </button>

              <motion.section
                    className="search-filters"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", border: "1px solid var(--border-light)" }}
                  >
                    <h2>Buscar especies</h2>
                    <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
                      {/* Barra de búsqueda principal */}
                      <div className="filter-row">
                        <div className="filter-group" style={{ flex: 1 }}>
                          <label htmlFor="search-name">Buscar por nombre:</label>
                          <input
                            type="text"
                            id="search-name"
                            value={searchName}
                            onChange={(e) => { setSearchName(e.target.value); setCurrentPage(1); }}
                            placeholder="Nombre común, científico o en inglés..."
                          />
                        </div>
                      </div>

                      {/* Fila de controles secundarios */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => setFiltersExpanded(!filtersExpanded)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "0.5rem",
                            background: filtersExpanded ? "var(--primary)" : "transparent",
                            color: filtersExpanded ? "#fff" : "var(--primary)",
                            border: "1.5px solid var(--primary)",
                            borderRadius: "var(--radius-full)",
                            padding: "0.4rem 1rem",
                            fontSize: "0.85rem", fontWeight: "600", cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          <SlidersHorizontal size={14} />
                          Filtros avanzados
                          {activeFilterCount > 0 && (
                            <span style={{
                              background: filtersExpanded ? "rgba(255,255,255,0.3)" : "var(--primary)",
                              color: "#fff", borderRadius: "50%",
                              width: "18px", height: "18px",
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              fontSize: "0.7rem", fontWeight: "700",
                            }}>
                              {activeFilterCount}
                            </span>
                          )}
                          <ChevronDown
                            size={14}
                            style={{ transform: filtersExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
                          />
                        </button>

                        {(activeFilterCount > 0 || searchName) && (
                          <button
                            type="button"
                            onClick={handleReset}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "0.4rem",
                              background: "transparent", color: "var(--text-muted)",
                              border: "1px solid var(--border)", borderRadius: "var(--radius-full)",
                              padding: "0.4rem 0.9rem", fontSize: "0.82rem", cursor: "pointer",
                            }}
                          >
                            × Limpiar
                          </button>
                        )}
                      </div>

                      {/* Filtros avanzados colapsables */}
                      <AnimatePresence>
                        {filtersExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-light)", marginTop: "1rem" }}>
                              <div className="filter-row">
                                <div className="filter-group">
                                  <label htmlFor="filter-orden">Orden:</label>
                                  <select id="filter-orden" value={selectedOrden} onChange={(e) => { setSelectedOrden(e.target.value); setCurrentPage(1); }}>
                                    <option value="">Todos los órdenes</option>
                                    {filterOptions.ordenes.map((o) => <option key={o} value={o}>{o}</option>)}
                                  </select>
                                </div>
                                <div className="filter-group">
                                  <label htmlFor="filter-familia">Familia:</label>
                                  <select id="filter-familia" value={selectedFamilia} onChange={(e) => { setSelectedFamilia(e.target.value); setCurrentPage(1); }}>
                                    <option value="">Todas las familias</option>
                                    {filterOptions.familias.map((f) => <option key={f} value={f}>{f}</option>)}
                                  </select>
                                </div>
                              </div>
                              <div className="filter-row">
                                <div className="filter-group">
                                  <label htmlFor="filter-color">Color:</label>
                                  <select id="filter-color" value={selectedColor} onChange={(e) => { setSelectedColor(e.target.value); setCurrentPage(1); }}>
                                    <option value="">Todos los colores</option>
                                    {filterOptions.colores.map((c) => <option key={c} value={c}>{capitalize(c)}</option>)}
                                  </select>
                                </div>
                                <div className="filter-group">
                                  <label htmlFor="filter-size">Tamaño:</label>
                                  <select id="filter-size" value={selectedSize} onChange={(e) => { setSelectedSize(e.target.value); setCurrentPage(1); }}>
                                    <option value="">Todos los tamaños</option>
                                    <option value="pequeño">Pequeño</option>
                                    <option value="mediano">Mediano</option>
                                    <option value="grande">Grande</option>
                                  </select>
                                </div>
                                <div className="filter-group">
                                  <label htmlFor="filter-habitat">Hábitat:</label>
                                  <select id="filter-habitat" value={selectedHabitat} onChange={(e) => { setSelectedHabitat(e.target.value); setCurrentPage(1); }}>
                                    <option value="">Todos los hábitats</option>
                                    <option value="bosque">Bosque</option>
                                    <option value="rio">Río</option>
                                    <option value="arboles">Árboles</option>
                                    <option value="suelo">Suelo</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>

                    <div id="results-count" className="results-count">
                      {filteredData.length} especie{filteredData.length !== 1 ? "s" : ""} encontrada{filteredData.length !== 1 ? "s" : ""}
                    </div>
              </motion.section>

              <section className="birds-gallery">
                {currentItems.length === 0 ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-results" style={{ textAlign: "center", margin: "3rem 0" }}>
                    No se encontraron especies con los criterios seleccionados.
                  </motion.p>
                ) : (
                  <motion.div 
                    className="birds-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {currentItems.map((item) => (
                      <motion.div variants={itemVariants} key={item.id}>
                        <Link
                          href={activeCategory === "aves" ? `/aves/${item.id}` : `/fauna/${item.id}`}
                          className="bird-card"
                          style={{ display: 'block' }}
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
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {totalPages > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pagination"
                  >
                    <button
                      onClick={() => { setCurrentPage((prev) => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      disabled={currentPage === 1}
                      className="btn btn-secondary pagination-btn"
                    >
                      Anterior
                    </button>
                    <span className="pagination-info">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={() => { setCurrentPage((prev) => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      disabled={currentPage === totalPages}
                      className="btn btn-secondary pagination-btn"
                    >
                      Siguiente
                    </button>
                  </motion.div>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
