import { Camper } from "@/types/camper";
import Image from "next/image";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const imageSrc = camper.coverImage ?? camper.gallery[0]?.thumb ?? "/placeholder.jpg";

  return (
    <div className="camper-card">
      <Image src={imageSrc} alt={camper.name} width={300} height={200} />
      <h3>{camper.name}</h3>
      <p>{camper.location}</p>
      <p>€{camper.price}</p>
      <a href={`/catalog/${camper.id}`} target="_blank">
        <button>Show more</button>
      </a>
    </div>
  );
}
