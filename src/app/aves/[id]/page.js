import birdsData from "@/data/birds.json";
import BirdDetailClient from "@/components/BirdDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const bird = (birdsData.birds || []).find((b) => b.id === id);

  if (!bird) {
    return {
      title: "Ave no encontrada",
      description: "La especie de ave solicitada no se encuentra en el inventario del Corredor Biológico.",
    };
  }

  return {
    title: `${bird.nombreComun} (${bird.nombreCientifico})`,
    description: bird.descripcion || `Ficha técnica detallada de ${bird.nombreComun} en el Corredor Biológico Bosque Las Madres.`,
  };
}

export default async function BirdDetailPage({ params }) {
  const { id } = await params;
  const bird = (birdsData.birds || []).find((b) => b.id === id);

  return <BirdDetailClient bird={bird} />;
}
