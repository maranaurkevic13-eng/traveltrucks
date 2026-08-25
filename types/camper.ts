export interface Review {
  id: string;
  user: string;
  rating: number; 
  comment: string;
}

export interface Camper {
  id: string;
  name: string;
  location: string;
  price: number;
  images: string[];
  description: string;
  transmission: "manual" | "automatic";
  engine: "diesel" | "petrol" | "electric";
  bodyType: "van" | "motorhome" | "caravan";
  reviews: Review[];
}

export interface PaginatedResponse {
  items: Camper[];
  hasMore: boolean;
}

export interface BookingData {
  name: string;
  email: string;
  date: string;
}
