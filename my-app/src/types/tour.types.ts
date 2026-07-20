export type TourPayload = {
  slug: string;
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  propertyType: string;
  toursType: string;
  price: number;
  route: string[];
  food: string;
  rating: number;

  departures: {
    id: number;
    tourId: number;
    startDate: Date;
    endDate: Date;
    departureCity: string;
    status: string;
  }[];
};

export type TourListPayload = {
  slug: string;
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  propertyType: string;
  toursType: string;
  price: number;
  route: string[];
  food: string;
  rating: number;
};

export type PopularToursProps = {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

export type PopularReviewsPayload = {
  id: number;
  rating: number;
  comment: string;
  author: {
    id: number;
    name: string | null;
  };
  instagram: string | null;
  tourId: number;
};

export type TourReviewsPayload = {
  id: number;
  tour: {
    id: number;
    slug: string;
  };
  rating: number;
  comment: string;
  instagram: string | null;
  author: {
    id: number;
    name: string | null;
  };
};
