import EjeTemplate from "@/components/EjeTemplate";

export const metadata = {
  title: "Eje Ambiental",
  description: "Conservación de cuencas hidrográficas y protección de la conectividad forestal.",
};

export default function AmbientalPage() {
  const data = {
    title: "Eje Ambiental",
    subtitle: "Conservando nuestros ecosistemas, fuentes de agua y biodiversidad.",
    heroImage: "/assets/images/generadas/eje_ambiental.png",
    intro: [
      "El corazón de nuestro corredor es la protección del medio ambiente. Este eje se enfoca en la conservación activa de los ecosistemas forestales y la protección de las vitales cuencas hidrográficas que sustentan la vida en Limón.",
      "Trabajamos en proyectos de reforestación, limpieza de ríos y monitoreo de la salud del bosque para garantizar que la conectividad biológica entre las áreas protegidas y la costa se mantenga fuerte, resiliente y llena de vida."
    ],
    metrics: [
      { icon: "🌳", value: "10,000+", label: "Árboles Plantados" },
      { icon: "💧", value: "5", label: "Ríos Protegidos" },
      { icon: "🦅", value: "120+", label: "Especies Monitoreadas" }
    ],
    actions: [
      {
        title: "Reforestación Activa",
        text: "Llevamos a cabo campañas continuas de plantación de árboles nativos en zonas degradadas para restaurar la conectividad del bosque y ofrecer hogar a la vida silvestre.",
        image: "/assets/images/generadas/cuidar_naturaleza_hero_1782529815987.jpg"
      },
      {
        title: "Protección de Cuencas Hidrográficas",
        text: "Monitoreamos y protegemos las principales fuentes de agua que abastecen a las comunidades de Matama y Valle de la Estrella, asegurando agua limpia y abundante.",
        image: "/assets/images/generadas/hero_paisaje.png"
      }
    ],
    quote: {
      text: "Proteger el agua y el bosque es garantizar la vida y el futuro de nuestras comunidades por generaciones.",
      author: "Comité Técnico del Corredor"
    },
    gallery: [
      "/assets/images/generadas/eje_ambiental.png",
      "/assets/images/generadas/cuidar_naturaleza_hero_1782529815987.jpg",
      "/assets/images/generadas/hero_paisaje.png"
    ]
  };

  return <EjeTemplate {...data} />;
}
