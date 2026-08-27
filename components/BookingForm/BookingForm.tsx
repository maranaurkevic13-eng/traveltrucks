"use client";

import { useState } from "react";
import { bookCamper } from "@/lib/api";

export default function BookingForm({ camperId }: { camperId: string }) {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      date: formData.get("date") as string,
    };
    await bookCamper(camperId, bookingData);
    setSuccess(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" required />
        <input name="email" placeholder="Your email" required />
        <input type="date" name="date" required />
        <button type="submit">Book now</button>
      </form>
      {success && <p className="success">Booking successful!</p>}
    </div>
  );
}
