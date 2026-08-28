import { getCamperById, getCamperReviews } from "@/lib/api";
import Gallery from "@/components/Gallery/Gallery";
import css from "./camperld.module.css";
import CamperDetails from "@/components/CamperDetails/CamperDetails";
import BookingForm from "@/components/BookingForm/BookingForm";
import Reviews from "@/components/Reviews/Reviews";

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
    <div className={css.reviewsContent}>
     <h3 className={css.title}>Reviews</h3>
      <div>
       <Reviews reviews={reviews} />
        </div>
        </div>


      
      <div>
       {camper.id && <BookingForm camperId={camper.id} />}
        </div>
    
      
    </div>
  );
}
