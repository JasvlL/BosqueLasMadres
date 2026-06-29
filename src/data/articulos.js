export const articulos = [
  {
    slug: "conteo-aves-2024-resultados",
    titulo: "Conteo de Aves 2024: 177 especies registradas en el corredor",
    categoria: "Ciencia Ciudadana",
    fechaFormateada: "27 de octubre, 2024",
    fecha: "2024-10-27",
    imagen: "/assets/images/generadas/conteo_aves_hero_1782529803938.jpg",
    resumen:
      "El segundo conteo comunitario de aves del CBBM superó todas las expectativas: 177 especies registradas en dos jornadas a lo largo de cuatro rutas en Limón, Costa Rica.",
    tiempoLectura: "4 min",
    autor: "Sofía Stein",
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Los días 26 y 27 de octubre de 2024, más de 40 voluntarios del Corredor Biológico Bosque Las Madres (CBBM) recorrieron cuatro rutas estratégicas en la región de Limón: Selva Bananito, Ruta Burrico, San Clemente y Aviarios del Caribe.",
      },
      {
        tipo: "parrafo",
        texto:
          "El resultado superó todas las proyecciones iniciales: 177 especies de aves registradas, un hito para la ciencia ciudadana en la región Caribe de Costa Rica.",
      },
      {
        tipo: "titulo",
        texto: "Cuatro rutas, cuatro ecosistemas",
      },
      {
        tipo: "parrafo",
        texto:
          "Cada ruta ofreció una ventana distinta a la biodiversidad del corredor. La Selva Bananito, con su dosel alto y humedad constante, concentró el mayor número de especies forestales. La Ruta Burrico destacó por especies de borde y zonas de amortiguamiento, mientras que San Clemente y Aviarios del Caribe revelaron la riqueza de ecosistemas acuáticos y humedales costeros.",
      },
      {
        tipo: "parrafo",
        texto:
          "La participación comunitaria fue clave: birders locales con años de experiencia guiaron a voluntarios nuevos, transmitiendo conocimiento sobre el entorno y fortaleciendo el vínculo entre comunidad y conservación.",
      },
      {
        tipo: "titulo",
        texto: "Próximos pasos",
      },
      {
        tipo: "parrafo",
        texto:
          "Los datos recopilados se integrarán al inventario permanente del CBBM y servirán como línea base para futuros conteos. El comité ya planifica el Conteo 2025 con mejoras metodológicas y mayor cobertura geográfica.",
      },
    ],
  },
  {
    slug: "restauracion-bosque-200-arboles",
    titulo: "200 árboles sembrados: jornada de restauración en el corredor",
    categoria: "Restauración",
    fechaFormateada: "15 de marzo, 2025",
    fecha: "2025-03-15",
    imagen: "/assets/images/generadas/eje_educativo_1782529755800.jpg",
    resumen:
      "Voluntarios y familias de la comunidad plantaron 200 árboles nativos en zonas degradadas del corredor, conectando fragmentos de bosque clave para la fauna local.",
    tiempoLectura: "3 min",
    autor: "Sofía Stein",
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "El pasado 15 de marzo, más de 50 personas —entre familias locales, estudiantes universitarios y voluntarios del CBBM— se reunieron en los predios degradados del corredor para plantar 200 árboles de especies nativas.",
      },
      {
        tipo: "parrafo",
        texto:
          "Las especies seleccionadas —guarumo, cedro, higuerón y palmas nativas— no solo ayudan a restaurar el dosel forestal, sino que proveen frutos y refugio para las aves y mamíferos registrados en el inventario del corredor.",
      },
      {
        tipo: "titulo",
        texto: "Por qué restaurar aquí",
      },
      {
        tipo: "parrafo",
        texto:
          "El área intervenida corresponde a un fragmento degradado que interrumpe la conectividad entre dos bloques de bosque maduro. Al cerrarlo con vegetación nativa, el corredor recupera continuidad ecológica: permite el movimiento de fauna, la dispersión de semillas y la regulación hídrica local.",
      },
      {
        tipo: "parrafo",
        texto:
          "El monitoreo de los árboles sembrados comenzará tres meses después de la jornada, evaluando tasas de supervivencia y crecimiento como indicadores del éxito de la restauración.",
      },
    ],
  },
  {
    slug: "nuevas-especies-registradas-2025",
    titulo: "Tres nuevas especies registradas en el corredor biológico",
    categoria: "Biodiversidad",
    fechaFormateada: "10 de junio, 2025",
    fecha: "2025-06-10",
    imagen: "/assets/images/generadas/aves_hero_1782529832885.jpg",
    resumen:
      "Investigadores y observadores del CBBM documentaron tres especies nuevas para el inventario: una rana arborícola, un murciélago frugívoro y una orquídea endémica de la región Caribe.",
    tiempoLectura: "5 min",
    autor: "Sofía Stein",
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Durante las jornadas de monitoreo de mayo y junio 2025, el equipo de investigación del CBBM documentó tres especies que no formaban parte del inventario oficial del corredor: una rana arborícola, un murciélago frugívoro y una orquídea endémica.",
      },
      {
        tipo: "parrafo",
        texto:
          "Los hallazgos refuerzan la importancia ecológica del corredor como refugio de biodiversidad en una región históricamente afectada por la expansión agrícola y la fragmentación del paisaje.",
      },
      {
        tipo: "titulo",
        texto: "Los tres registros",
      },
      {
        tipo: "parrafo",
        texto:
          "La rana arborícola (posiblemente Agalychnis callidryas) fue fotografiada en las noches del 8 y 9 de mayo cerca de una quebrada del sector Bananito. El murciélago frugívoro fue capturado con redes de niebla durante un muestreo nocturno. La orquídea, aún en proceso de identificación taxonómica, fue hallada en el dosel de un árbol emergente.",
      },
      {
        tipo: "parrafo",
        texto:
          "Estos registros se encuentran en revisión por especialistas de la Universidad de Costa Rica para confirmar la identificación de especie y formalizar su incorporación al inventario nacional.",
      },
      {
        tipo: "titulo",
        texto: "Contribución al conocimiento regional",
      },
      {
        tipo: "parrafo",
        texto:
          "El CBBM mantiene un protocolo de monitoreo permanente que ya ha documentado más de 200 especies entre aves, mamíferos, reptiles, anfibios y plantas. Cada nuevo registro suma evidencia sobre el estado de salud del corredor y justifica los esfuerzos de conservación y restauración en curso.",
      },
    ],
  },
];

export function getArticuloPorSlug(slug) {
  return articulos.find((a) => a.slug === slug) || null;
}
