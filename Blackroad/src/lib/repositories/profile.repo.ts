import { BookingStatus } from "../../../generated/prisma/enums";
import { FavoriteWhereUniqueInput } from "../../../generated/prisma/models";
import { prisma } from "../prisma";

type ReviewData = {
  comment: string;
  rating: number;
  instagram?: string;
  authorId: number;
  tourId: number;
};

type FavorteTourProps = {
  userId: number;
  tourId: number;
};

export const dbCreateReview = async (data: ReviewData) =>
  prisma.review.create({ data });

export const dbFindReview = async (filter: {
  authorId?: number;
  tourId?: number;
}) =>
  prisma.review.findMany({
    where: filter,
    select: {
      id: true,
      comment: true,
      rating: true,
      instagram: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      tourId: true,
    },
  });

export const dbFindPopularReview = async () =>
  prisma.review.findMany({
    where: {
      rating: {
        gte: 4,
      },
    },
    select: {
      id: true,
      comment: true,
      rating: true,
      instagram: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      tourId: true,
    },
  });

export const dbCancelBooking = async (bookingId: number) =>
  prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.cancelled },
  });

export const dbCreateFavorteTour = async (data: FavorteTourProps) =>
  prisma.favorite.create({
    data,
  });

export const dbDeleteFavorteTours = async ({ id }: { id: number }) =>
  prisma.favorite.delete({
    where: { id },
  });

export const dbFindFavorteTours = async (userId: { userId: number }) =>
  prisma.favorite.findMany({
    where: userId,
    select: {
      id: true,
      tourId: true,
      tour: {
        select: {
          id: true,
          imageUrl: true,
          category: true,
          title: true,
          description: true,
          rating: true,
          price: true,
        },
      },
    },
  });
