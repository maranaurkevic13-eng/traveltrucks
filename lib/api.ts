import axios from "axios";
import { Camper, CamperListResponse, BookingData, Review } from "@/types/camper";

const API_URL = "https://campers-api.goit.study";

//  Список кемперів (каталог)
export const getCampers = async (
  page: number,
  filters: string
): Promise<CamperListResponse> => {
  const res = await axios.get(`${API_URL}/campers?page=${page}&limit=4&${filters}`);
  return res.data;
};

//  Деталі одного кемпера
export const getCamperById = async (id: string): Promise<Camper> => {
  const res = await axios.get(`${API_URL}/campers/${id}`);
  return res.data;
};

//  Відгуки для кемпера
export const getCamperReviews = async (id: string): Promise<Review[]> => {
  const res = await axios.get(`${API_URL}/campers/${id}/reviews`);
  return res.data;
};

//  Бронювання кемпера
export const bookCamper = async (
  id: string,
  data: BookingData
): Promise<{ success: boolean }> => {
  const res = await axios.post(`${API_URL}/campers/${id}/booking-requests`, data);
  return res.data;
};
