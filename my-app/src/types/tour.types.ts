export type TourPayload = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  price: number;
  route: string[];
  tourDates: Date[];
  duration: number;
  food: string;
  dateOfArrival: Date;
  dateOfDeparture: Date;
  createdAt: Date;
  updatedAt: Date;
};
