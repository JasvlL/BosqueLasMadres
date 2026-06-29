import EjeTemplate from "@/components/EjeTemplate";

export const metadata = {
  title: "Eje Educativo",
  description: "Talleres de concienciación y educación ambiental con escuelas locales.",
};

export default function EducativoPage() {
  const data = {
    title: "Eje Educativo",
    subtitle: "Sembrando conciencia en las nuevas generaciones.",
    heroImage: "/assets/images/generadas/eje_educativo_1782529755800.jpg",
    intro: [
      "La educación es la herramienta más poderosa para la conservación a largo plazo. Desarrollamos talleres y programas dinámicos en las escuelas y colegios locales para enseñar a niños y jóvenes sobre la invaluable biodiversidad que les rodea.",
      "Creemos que lo que se conoce se ama, y lo que se ama se protege. A través de salidas al campo, identificación de aves y charlas participativas, estamos formando a los futuros líderes ambientales de Limón."
    ],
    metrics: [
      { icon: "🏫", value: "12", label: "Escuelas Involucradas" },
      { icon: "📚", value: "800+", label: "Estudiantes Impactados" },
      { icon: "🦜", value: "30", label: "Talleres Realizados" }
    ],
    actions: [
      {
        title: "Charlas Interactivas Escolares",
        text: "Nuestros educadores ambientales visitan aulas para enseñar sobre especies endémicas, el ciclo del agua y la importancia de los corredores biológicos de manera lúdica.",
        image: "/assets/images/generadas/eje_educativo_1782529755800.jpg"
      },
      {
        title: "Laboratorios al Aire Libre",
        text: "Llevamos a los estudiantes fuera del aula, realizando caminatas por senderos seguros donde aprenden a identificar flora y fauna con binoculares y guías de campo.",
        image: "/assets/images/generadas/aves_hero_1782529832885.jpg"
      }
    ],
    quote: {
      text: "Solo amamos lo que conocemos, y solo protegemos lo que amamos.",
      author: "Filosofía Educativa del Bosque"
    },
    gallery: [
      "/assets/images/generadas/eje_educativo_1782529755800.jpg",
      "/assets/images/generadas/aves_hero_1782529832885.jpg",
      "/assets/images/generadas/hero_paisaje.png"
    ]
  };

  return <EjeTemplate {...data} />;
}
