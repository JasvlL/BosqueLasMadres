import faunaData from "@/data/fauna.json";
import BirdDetailClient from "@/components/BirdDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let animal = null;

  // Buscar en todas las categorías de fauna
  for (const category in faunaData) {
    const found = faunaData[category].find((a) => a.id === id);
    if (found) {
      animal = found;
      break;
    }
  }

  if (!animal) {
    return {
      title: "Especie no encontrada",
      description: "La especie solicitada no se encuentra en el inventario de fauna del Corredor Biológico.",
    };
  }

  return {
    title: `${animal.nombreComun} (${animal.nombreCientifico})`,
    description: animal.descripcion || `Ficha técnica detallada de ${animal.nombreComun} en el Corredor Biológico Bosque Las Madres.`,
  };
}

export default async function FaunaDetailPage({ params }) {
  const { id } = await params;
  let animal = null;

  // Buscar en todas las categorías de fauna
  for (const category in faunaData) {
    const found = faunaData[category].find((a) => a.id === id);
    if (found) {
      animal = found;
      break;
    }
  }

  // Utilizamos el mismo componente de cliente que creamos para las aves,
  // ya que la estructura de datos que enviamos (animal) es compatible.
  return <BirdDetailClient bird={animal} />;
}
