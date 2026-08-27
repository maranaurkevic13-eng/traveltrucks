import axios from "axios";
import { Camper, CamperListResponse, BookingData, Review } from "@/types/camper";

const API_URL = "https://campers-api.goit.study";

export const getCampers = async (
  page: number,
  filters: string
): Promise<CamperListResponse> => {
  const url = filters
    ? `${API_URL}/campers?page=${page}&limit=4&${filters}`
    : `${API_URL}/campers?page=${page}&limit=4`;

  const res = await axios.get(url);
  return res.data; // це масив кемперів
};


export const getCamperById = async (id: string): Promise<Camper | null> => {
  try {
    const res = await axios.get(`${API_URL}/campers/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.warn(`Camper with id ${id} not found`);
        return null;
      }
    }
    throw error;
  }
};

export const getCamperReviews = async (id: string): Promise<Review[]> => {
  const res = await axios.get(`${API_URL}/campers/${id}/reviews`);
  return res.data;
};

export const bookCamper = async (
  id: string,
  data: BookingData
): Promise<{ success: boolean }> => {
  const res = await axios.post(`${API_URL}/campers/${id}/booking-requests`, data);
  return res.data;
};
