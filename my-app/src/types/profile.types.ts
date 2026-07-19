import { Decimal } from "../../generated/prisma/internal/prismaNamespace";

export type UserReviewPayload = {
  id: number;
  rating: number;
  comment: string;
  instagram: string | null;
  author: {
    id: number;
    name: string | null;
  };
  tour: {
    id: number;
    slug: string;
  };
};

export type TourListHistoryPayload = {
  id: number;
  totalPrice: Decimal;
  status: string;
  tour: {
    id: number;
    title: string;
    slug: string;
    imageUrl: string;
    departures: {
      id: number;
      tourId: number;
      status: string;
      startDate: Date;
      endDate: Date;
      departureCity: string;
    }[];
  };
};
