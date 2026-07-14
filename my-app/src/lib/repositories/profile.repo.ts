import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
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

type CancelBookingProps = {
  bookingId: number;
  paymentId: number;
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

export const dbCancelPaidBooking = async ({
  bookingId,
  paymentId,
}: CancelBookingProps) =>
  prisma.$transaction([
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: BookingStatus.cancelled },
    }),
    prisma.payment.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.refunded },
    }),
  ]);

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
          slug: true,
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

export const dbCancelPendingBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: number;
  paymentId: number;
}) =>
  prisma.$transaction([
    prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.failed,
      },
    }),

    prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.cancelled,
      },
    }),
  ]);
