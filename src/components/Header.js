"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    // Vuelve a inicio y recarga como se indica en el boceto "al tocar logo vuelve a inicio y recarga"
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/sobre-nosotros", label: "Nosotros" },
    { href: "/sobre-el-corredor", label: "CBBM Ejes de Acción" },
    { href: "/aves", label: "Biodiversidad y Galería" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/mapa", label: "Ubicación Geográfica" },
    { href: "/cuidar-naturaleza", label: "Acciones de Protección" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="main-header">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        {/* Logo alineado a la izquierda */}
        <a href="/" onClick={handleLogoClick} className="logo" style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", color: "inherit" }}>
          <img
            src="/assets/images/aves/image183.png"
            alt="Logo Corredor Biológico Bosque Las Madres"
            style={{ width: "216px", height: "auto", margin: "-66px 0 -66px -36px", objectFit: "contain" }}
          />
          <h1 className="logo-text">Corredor Biológico</h1>
        </a>

        {/* Navegación en el centro/derecha */}
        <nav className="main-nav" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            className="menu-toggle"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          {/* Menú de cápsula consolidado */}
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith("#");
              const isActive = !isHashLink && pathname === link.href;
              
              if (isHashLink) {
                return (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link href={link.href} className={isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
