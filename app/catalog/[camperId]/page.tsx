import { getCamperById, getCamperReviews } from "@/lib/api";
import Gallery from "@/components/Gallery/Gallery";
import css from "./camperld.module.css";
import CamperDetails from "@/components/CamperDetails/CamperDetails";
import BookingForm from "@/components/BookingForm/BookingForm";

interface CamperPageProps {
  params: Promise<{ camperId: string }>;
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);
  if (!camper) return <p>No camper found</p>;

  const reviews = await getCamperReviews(camperId);   

  return (
    <div className={css.container}>
      {/* Галерея з 5 фото */}
      <div><Gallery images={camper.gallery} name={camper.name} /></div>


      <div>
        <CamperDetails camper={camper} />
      </div>


      <div>
        <h3>Reviews ({reviews.length})</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            <strong>{r.user}</strong> — {r.rating}★
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>
      </div>


      
      <div>
        <BookingForm camperId={camper.id} />
      </div>
    
      
    </div>
  );
}
