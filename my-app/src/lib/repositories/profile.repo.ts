import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../prisma";

type ReviewData = {
  comment: string;
  rating: number;
  instagram?: string;
  authorId: number;
  tourId: number;
  bookingId: number;
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
      tour: {
        select: { id: true, slug: true },
      },
    },
  });

export const dbFindPopularReview = async () =>
  prisma.review.findMany({
    where: {},
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
    orderBy: {
      rating: "desc",
    },
    take: 10,
  });

export const dbCancelPaidBooking = async ({
  bookingId,
  paymentId,
}: CancelBookingProps) =>
  cancelBookingAndRestoreSeats({
    bookingId,
    paymentId,
    bookingStatus: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.paid,
    cancelledPaymentStatus: PaymentStatus.refund_pending,
    failIfAlreadyTransitioned: true,
  });

export const dbAttachRefundId = async ({
  bookingId,
  paymentId,
  providerRefundId,
}: CancelBookingProps & { providerRefundId: string }) =>
  prisma.payment.updateMany({
    where: {
      id: paymentId,
      bookingId,
      status: PaymentStatus.refund_pending,
      providerRefundId: null,
      booking: { status: BookingStatus.cancelled },
    },
    data: { providerRefundId },
  });

export const dbMarkRefundRequestFailed = async ({
  bookingId,
  paymentId,
  errorMessage,
  providerRefundId,
}: CancelBookingProps & {
  errorMessage: string;
  providerRefundId?: string;
}) =>
  prisma.payment.updateMany({
    where: {
      id: paymentId,
      bookingId,
      status: PaymentStatus.refund_pending,
      providerRefundId: providerRefundId ?? null,
      booking: { status: BookingStatus.cancelled },
    },
    data: {
      status: PaymentStatus.refund_failed,
      errorMessage,
      ...(providerRefundId ? { providerRefundId } : {}),
    },
  });

export const dbCreateFavorteTour = async (data: FavorteTourProps) =>
  prisma.favorite.create({
    data,
  });

export const dbDeleteFavorteTours = async ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}) =>
  prisma.favorite.delete({
    where: { id, userId },
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
  cancelBookingAndRestoreSeats({
    bookingId,
    paymentId,
    bookingStatus: BookingStatus.pending,
    paymentStatus: PaymentStatus.pending,
    cancelledPaymentStatus: PaymentStatus.failed,
    failIfAlreadyTransitioned: true,
  });

export const dbExpirePendingBooking = async ({
  bookingId,
}: {
  bookingId: number;
}) =>
  cancelBookingAndRestoreSeats({
    bookingId,
    bookingStatus: BookingStatus.pending,
    paymentStatus: PaymentStatus.pending,
    cancelledPaymentStatus: PaymentStatus.failed,
    expiresBefore: new Date(),
    failIfAlreadyTransitioned: false,
  });

const cancelBookingAndRestoreSeats = async ({
  bookingId,
  paymentId,
  bookingStatus,
  paymentStatus,
  cancelledPaymentStatus,
  providerRefundId,
  expiresBefore,
  failIfAlreadyTransitioned,
}: {
  bookingId: number;
  paymentId?: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  cancelledPaymentStatus: PaymentStatus;
  providerRefundId?: string;
  expiresBefore?: Date;
  failIfAlreadyTransitioned: boolean;
}) =>
  prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        departureId: true,
        adults: true,
        children: true,
        tour: { select: { capacity: true } },
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    const bookingUpdate = await tx.booking.updateMany({
      where: {
        id: bookingId,
        status: bookingStatus,
        ...(expiresBefore
          ? {
              OR: [
                { expiresAt: null },
                { expiresAt: { lte: expiresBefore } },
              ],
            }
          : {}),
        payments: {
          some: {
            ...(paymentId ? { id: paymentId } : {}),
            status: paymentStatus,
          },
        },
      },
      data: { status: BookingStatus.cancelled },
    });

    if (bookingUpdate.count !== 1) {
      if (failIfAlreadyTransitioned) {
        throw new Error("Only an active booking can release reserved capacity");
      }

      return false;
    }

    const paymentUpdate = await tx.payment.updateMany({
      where: {
        ...(paymentId ? { id: paymentId } : {}),
        bookingId,
        status: paymentStatus,
      },
      data: {
        status: cancelledPaymentStatus,
        ...(providerRefundId ? { providerRefundId } : {}),
      },
    });

    if (paymentUpdate.count < 1) {
      throw new Error("Payment state changed while cancelling booking");
    }

    const bookedSeats = booking.adults + booking.children;
    const departureUpdate = await tx.tourDeparture.updateMany({
      where: {
        id: booking.departureId,
        availableSeats: {
          lte: booking.tour.capacity - bookedSeats,
        },
      },
      data: {
        availableSeats: {
          increment: bookedSeats,
        },
      },
    });

    if (departureUpdate.count !== 1) {
      throw new Error("Booking capacity could not be safely restored");
    }

    return true;
  });
