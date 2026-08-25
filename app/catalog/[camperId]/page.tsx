import { getCamperById, getCamperReviews, bookCamper } from "@/lib/api";
import Image from "next/image";

interface CamperPageProps {
  params: Promise<{ camperId: string }>;
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
    const camper = await getCamperById(camperId);
    if (!camper) return <p>No camper found</p>;
  const reviews = await getCamperReviews(camperId);

  if (!camper) return <p>No camper found</p>;

  return (
    <div>
      <h2>{camper.name}</h2>
      <p>{camper.description}</p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {camper.gallery.map((img) => (
          <Image key={img.id} src={img.original} alt={camper.name} width={400} height={300} />
        ))}
      </div>

      <h3>Specs</h3>
      <ul>
        <li>Location: {camper.location}</li>
        <li>Price: €{camper.price}</li>
        <li>Engine: {camper.engine}</li>
        <li>Transmission: {camper.transmission}</li>
        <li>Amenities: {Array.isArray(camper.amenities) ? camper.amenities.join(", ") : camper.amenities}</li>
      </ul>

      <h3>Reviews ({reviews.length})</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            <strong>{r.user}</strong> — {r.rating}★
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>

      <h3>Book this camper</h3>
      <form
        action={async (formData: FormData) => {
          "use server";
          const bookingData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            date: formData.get("date") as string,
          };
          await bookCamper(camperId, bookingData);
        }}
      >
        <input name="name" placeholder="Your name" required />
        <input name="email" placeholder="Your email" required />
        <input type="date" name="date" required />
        <button type="submit">Book now</button>
      </form>
    </div>
  );
}
