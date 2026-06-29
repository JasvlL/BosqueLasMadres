import EjeTemplate from "@/components/EjeTemplate";

export const metadata = {
  title: "Eje de Investigación",
  description: "Inventarios científicos de avifauna y base de datos de biodiversidad.",
};

export default function InvestigacionPage() {
  const data = {
    title: "Eje de Investigación y Monitoreo",
    subtitle: "Ciencia ciudadana para comprender y proteger nuestra biodiversidad.",
    heroImage: "/assets/images/generadas/eje_investigacion_1782529765569.jpg",
    intro: [
      "Las decisiones de conservación deben basarse en datos sólidos. A través del Eje de Investigación y Monitoreo, impulsamos inventarios científicos continuos, con un enfoque especial en la rica avifauna de nuestra región.",
      "Promovemos la 'ciencia ciudadana', involucrando a las comunidades en la recolección de datos, como los famosos conteos de aves, generando información crucial que guía nuestras estrategias ecológicas y aporta a las bases de datos nacionales."
    ],
    metrics: [
      { icon: "🦉", value: "350+", label: "Especies Registradas" },
      { icon: "📊", value: "5", label: "Aportes Nacionales eBird" },
      { icon: "🙋🏽‍♂️", value: "100+", label: "Científicos Ciudadanos" }
    ],
    actions: [
      {
        title: "Conteos de Aves Anuales",
        text: "Organizamos expediciones ciudadanas para documentar las especies de aves que habitan y transitan el corredor, aportando datos invaluables sobre salud ecológica e impacto climático.",
        image: "/assets/images/generadas/conteo_aves_hero_1782529803938.jpg"
      },
      {
        title: "Monitoreo con Cámaras Trampa",
        text: "Instalamos y revisamos cámaras ocultas en el bosque profundo para registrar la presencia de grandes felinos y mamíferos escurridizos sin perturbar su hábitat.",
        image: "/assets/images/generadas/eje_investigacion_1782529765569.jpg"
      }
    ],
    quote: {
      text: "Cada dato registrado por nuestra comunidad es un escudo más para defender nuestro bosque.",
      author: "Coordinación Científica"
    },
    gallery: [
      "/assets/images/generadas/eje_investigacion_1782529765569.jpg",
      "/assets/images/generadas/conteo_aves_hero_1782529803938.jpg",
      "/assets/images/generadas/aves_hero_1782529832885.jpg"
    ]
  };

  return <EjeTemplate {...data} />;
}
