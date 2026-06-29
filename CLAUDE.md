@AGENTS.md

# Corredor Biológico Bosque Las Madres — CBBM

Sitio web de conservación para el Corredor Biológico Bosque Las Madres en Limón, Costa Rica.

## Stack

- **Framework**: Next.js 16.2.9 con App Router (`src/app/`)
- **React**: 19.2.4
- **Animaciones**: framer-motion 12.x
- **Iconos**: lucide-react 1.21 (iconos de marcas = SVGs inline en Footer)
- **Estilos**: CSS puro con variables CSS (sin Tailwind, sin CSS Modules)
- **Fuentes**: Inter, Outfit, Oswald vía `next/font/google` en `src/app/layout.js`
- **Alias**: `@/` → `src/`

## Comandos

```bash
npm run dev      # servidor local en localhost:3000
npm run build    # build de producción
npm run lint     # eslint
```

## Estructura de directorios relevante

```
src/
  app/
    layout.js              # Root layout: fuentes, Header, Footer, GlobalLoader
    page.js                # Página inicio — "use client", usa Carousel
    globals.css            # Sistema de diseño: variables CSS, reset, utilidades
    backgrounds.css        # Fondos decorativos
    loading.js             # GlobalLoader skeleton
    aves/
      page.js              # Catálogo biodiversidad con filtros y paginación
      [id]/page.js         # Detalle de especie
      layout.js
    fauna/[id]/page.js     # Detalle fauna genérica
    galeria/page.js        # Galería
    conteo-aves-2024/      # Resultados del conteo de aves Oct 2024
    sobre-el-corredor/     # Info del corredor + ejes de acción
    ejes-de-accion/
      ambiental/
      economico/
      educativo/
      investigacion/
      social-cultural/     # Todos usan EjeTemplate
    proyectos/
    mapa/
    cuidar-naturaleza/
    contacto/
    sobre-nosotros/
    voluntariado/
    creditos/
  components/
    Header.js              # Nav con menú hamburguesa, logo con click reload
    Footer.js              # SVGs inline para redes sociales
    EjeTemplate.js         # Plantilla reutilizable para todas las páginas de ejes
    GlobalLoader.js        # Loader global de página
    Carousel.js            # Carrusel para página inicio
    BirdDetailClient.js    # Detalle de ave — client component
  data/
    birds.json             # 177 aves del conteo 2024 (id, orden, familia, nombres, imagen, etc.)
    fauna.json             # mamíferos, reptiles, anfibios, plantas, hongos
public/
  assets/images/
    aves/                  # Fotos de aves (image1.png … image194, + nombres científicos)
    generadas/             # Imágenes hero generadas para páginas
    mision.png, vision.png, etc.
```

## Sistema de diseño (CSS variables en globals.css)

```css
--primary: #1E6A6D        /* verde petróleo — color principal */
--secondary: #1BA6A6      /* turquesa */
--primary-support: #264E52
--accent-amber: #CFAE70   /* ámbar tierra — acentos */
--bg: #FCFCFC
--surface: rgba(255,255,255,0.75)
--text: #1F1F1F
--text-muted: #597E7A
--font-base: var(--font-inter)
--font-heading: var(--font-oswald)
--radius-lg: 20px  --radius-md: 12px  --radius-sm: 6px
--transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)
```

Clases utilitarias de uso frecuente: `.container`, `.container-narrow`, `.glass-card`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-icon`, `.glass-btn`, `.text-link`, `.premium-padding`, `.section-title`, `.hero-page`, `.hero-page-bg`, `.hero-page-content`.

## Patrones de componentes

### Páginas con "use client"
Las páginas interactivas (filtros, animaciones) llevan `"use client"` al tope. Las páginas estáticas son Server Components por defecto.

### Layout por sección
Cada sección con metadata específica tiene su propio `layout.js`:
```js
export const metadata = { title: "...", description: "..." };
export default function Layout({ children }) { return children; }
```

### EjeTemplate
Todos los ejes de acción usan `<EjeTemplate>` con props: `title`, `subtitle`, `heroImage`, `intro[]`, `metrics[]`, `actions[]`, `quote`, `gallery[]`.

### Imágenes
- Usar `next/image` (`<Image>`) para imágenes estáticas conocidas
- `<img>` con `loading="lazy"` solo para imágenes dinámicas desde JSON
- Imágenes de aves: `/assets/images/aves/<NombreCientifico>.jpg` o `/assets/images/aves/image<N>.png`

### Animaciones
Framer Motion: `motion.div` con `initial/animate/variants`. Pattern `fadeInUp` + `staggerContainer` es el estándar del proyecto.

## Datos (birds.json y fauna.json)

Estructura de un ave en `birds.json`:
```json
{
  "id": "buteogallus-anthracinus",
  "orden": "Accipitriformes",
  "familia": "Accipitridae",
  "nombreCientifico": "Buteogallus anthracinus",
  "nombreIngles": "Common Black Hawk",
  "nombreComun": "Gavilán Cangrejero",
  "imagen": "/assets/images/aves/Buteogallus anthracinus.jpg"
}
```

## Contacto del proyecto

- **Coordinadora**: Sofia Stein — sofiastein1@gmail.com — 8723 4884
- **Región**: Matama y Valle de la Estrella, Limón, Costa Rica
- **Conteo 2024**: 26-27 octubre 2024, 177 especies, rutas: Selva Bananito, Ruta Burrico, San Clemente, Aviarios del Caribe
