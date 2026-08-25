"use client";

import { useQuery } from "@tanstack/react-query";
import { getCamperById, bookCamper } from "@/lib/api";
import { Camper, BookingData } from "@/types/camper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface CamperDetailsProps {
  params: { camperId: string };
}

export default function CamperDetails({ params }: CamperDetailsProps) {
  const { data, isLoading } = useQuery<Camper>({
    queryKey: ["camper", params.camperId],
    queryFn: () => getCamperById(params.camperId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No camper found</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: BookingData = {
      name: "Marianna",
      email: "test@test.com",
      date: new Date().toISOString().split("T")[0],
    };
    await bookCamper(data.id, formData); // 👈 правильний endpoint
    alert("Booking successful!");
  };

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <Swiper>
        {data.gallery.map((img) => (
          <SwiperSlide key={img.id}>
            <Image src={img.original} alt={data.name} width={400} height={300} />
          </SwiperSlide>
        ))}
      </Swiper>
      <h3>Amenities</h3>
      <ul>
        {(Array.isArray(data.amenities) ? data.amenities : [data.amenities]).map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" />
        <input name="email" placeholder="Your email" />
        <button type="submit">Book now</button>
      </form>
    </div>
  );
}
