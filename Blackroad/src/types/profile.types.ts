import { BookingStatus } from "../../generated/prisma/enums";
import { Decimal } from "../../generated/prisma/internal/prismaNamespace";

export type UserReviewPayload = {
  id: number;
  tourId: number;
  rating: number;
  comment: string;
  instagram: string | null;
  author: {
    id: number;
    name: string | null;
  };
};

export type TourListHistoryPayload = {
  id: number;
  totalPrice: Decimal;
  status: BookingStatus;
  tour: {
    id: number;
    title: string;
    imageUrl: string;
    dateOfArrival: Date;
    dateOfDeparture: Date;
  };
};
