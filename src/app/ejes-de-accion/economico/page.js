import EjeTemplate from "@/components/EjeTemplate";

export const metadata = {
  title: "Eje Económico",
  description: "Promoción de prácticas productivas sostenibles y turismo comunitario.",
};

export default function EconomicoPage() {
  const data = {
    title: "Eje Económico",
    subtitle: "Desarrollo sostenible e impulso a productores locales.",
    heroImage: "/assets/images/generadas/eje_economico.png",
    intro: [
      "La conservación no puede estar separada del bienestar de quienes habitan el territorio. El Eje Económico apoya a los agricultores locales y emprendedores en la transición hacia prácticas agroecológicas que respeten los suelos y la fauna.",
      "Impulsamos iniciativas de turismo ecológico y comunitario, permitiendo que la naturaleza misma sea una fuente de ingresos sostenibles, valorizando los bosques en pie y creando oportunidades justas para las familias del Corredor."
    ],
    metrics: [
      { icon: "👨‍🌾", value: "25+", label: "Fincas Sostenibles" },
      { icon: "🏕️", value: "4", label: "Rutas Ecoturísticas" },
      { icon: "🐝", value: "15", label: "Productores de Miel" }
    ],
    actions: [
      {
        title: "Agroecología Local",
        text: "Brindamos acompañamiento a fincas locales para implementar prácticas agrícolas sostenibles que eliminen químicos dañinos y protejan la salud del suelo y polinizadores.",
        image: "/assets/images/generadas/eje_economico.png"
      },
      {
        title: "Ecoturismo Comunitario",
        text: "Capacitamos a guías locales y apoyamos el desarrollo de senderos y experiencias turísticas que permiten generar ingresos cuidando y valorando nuestra riqueza natural.",
        image: "/assets/images/generadas/proyectos_hero_1782529824789.jpg"
      }
    ],
    quote: {
      text: "La verdadera riqueza de nuestra tierra está en producir respetando los ciclos de la Madre Naturaleza.",
      author: "Red de Productores Locales"
    },
    gallery: [
      "/assets/images/generadas/eje_economico.png",
      "/assets/images/generadas/proyectos_hero_1782529824789.jpg",
      "/assets/images/generadas/contacto_hero_1782529793555.jpg"
    ]
  };

  return <EjeTemplate {...data} />;
}
