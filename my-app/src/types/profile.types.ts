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
  user: {
    id: number;
  };
  tour: {
    id: number;
    title: string;
    slug: string;
    imageUrl: string;
  };
  departure: {
    id: number;
    startDate: Date;
    endDate: Date;
  };
};
