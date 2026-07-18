export type TourPayload = {
  id: number;
  slug: string;
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

export type PopularToursProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

export type TourReviewsPayload = {
  id: number;
  rating: number;
  comment: string;
  instagram: string | null;
  tour: {
    id: number;
    slug: string;
  };
  author: {
    id: number;
    name: string | null;
  };
};
