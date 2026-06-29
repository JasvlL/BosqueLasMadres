import EjeTemplate from "@/components/EjeTemplate";

export const metadata = {
  title: "Eje Social y Cultural",
  description: "Vinculación comunitaria y festivales ecológicos en el Corredor Biológico Bosque Las Madres.",
};

export default function SocialCulturalPage() {
  const data = {
    title: "Eje Social y Cultural",
    subtitle: "Promoviendo la identidad y las expresiones artísticas vinculadas a la naturaleza.",
    heroImage: "/assets/images/generadas/eje_social.png",
    intro: [
      "Nuestro Eje Social y Cultural busca empoderar a los habitantes de Matama y Valle de la Estrella, reconociéndolos como los verdaderos guardianes del bosque.",
      "A través de festivales ecológicos, ecoferias, y encuentros artísticos, creamos espacios donde la comunidad celebra la riqueza de su entorno natural, fomentando un profundo sentido de pertenencia y orgullo por el Corredor Biológico Bosque Las Madres."
    ],
    metrics: [
      { icon: "👥", value: "500+", label: "Personas Involucradas" },
      { icon: "🎨", value: "15", label: "Festivales Ecológicos" },
      { icon: "🌱", value: "30", label: "Emprendimientos Locales" }
    ],
    actions: [
      {
        title: "Ferias Comunitarias",
        text: "Organizamos ferias donde los artesanos y productores locales pueden vender sus productos sostenibles, fortaleciendo la economía circular y la identidad cultural.",
        image: "/assets/images/generadas/contacto_hero_1782529793555.jpg"
      },
      {
        title: "Expresiones Artísticas",
        text: "Apoyamos el teatro, la música y la pintura local que tengan como eje central la conservación y el respeto por nuestra Madre Naturaleza.",
        image: "/assets/images/generadas/comunidad_bosque.png"
      }
    ],
    quote: {
      text: "La conservación no es solo salvar árboles, es preservar nuestra cultura, nuestras raíces y el futuro de nuestras familias.",
      author: "Líder Comunitario de Matama"
    },
    gallery: [
      "/assets/images/generadas/hero_paisaje.png",
      "/assets/images/generadas/eje_social.png",
      "/assets/images/generadas/comunidad_bosque.png"
    ]
  };

  return <EjeTemplate {...data} />;
}
