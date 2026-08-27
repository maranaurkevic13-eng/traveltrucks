export interface Review {
  id: string;
  user: string;
  rating: number; 
  comment: string;
}

export interface GalleryImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: string; 
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "manual" | "automatic";
  engine: "diesel" | "petrol" | "electric";
  amenities: string | string[]; 
  coverImage?: string;
  gallery: GalleryImage[];
  createdAt: string;
  updatedAt: string;
  reviews?: Review[]; 
}

export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface BookingData {
  name: string;
  email: string;
  date?: string; 
}
