import { BookingStatus, PaymentStatus } from "../../../generated/prisma/client";
import { dbFindUser } from "../repositories/auth.repo";
import { dbFindBookingById } from "../repositories/booking.repo";
import { dbFindPayment } from "../repositories/payment.repo";
import {
  dbCancelPaidBooking,
  dbCancelPendingBooking,
  dbCreateReview,
} from "../repositories/profile.repo";
import { dbFindTour } from "../repositories/tour.repo";
import { stripe } from "../stripe";
import { getCurrentUser } from "../utility/getCurrentUser";

type LeaveReviewProps = {
  review: string;
  rating: number;
  bookingId: number;
};

export const leaveReview = async ({
  review,
  rating,
  bookingId,
}: LeaveReviewProps) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("Invalid id");
  }

  const user = await dbFindUser({ id: userId });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const booking = await dbFindBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  const tour = await dbFindTour({ id: booking.tourId });

  if (!tour) {
    throw new Error("Tour not found");
  }

  if (booking.status !== BookingStatus.completed) {
    throw new Error(
      "You are not allowed to review this tour because you haven't completed it yet.",
    );
  }

  await dbCreateReview({
    authorId: user.id,
    tourId: tour.id,
    comment: review,
    rating,
  });
};

export const cancelBooking = async ({ bookingId }: { bookingId: number }) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("Invalid id");
  }

  const user = await dbFindUser({ id: userId });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const booking = await dbFindBookingById(bookingId);

  if (booking?.userId !== user.id) {
    throw new Error("Forbidden");
  }

  if (
    booking.status === BookingStatus.completed ||
    booking.status === BookingStatus.cancelled
  ) {
    throw new Error("Only active bookings can be canceled");
  }

  const pendingPayment = await dbFindPayment({
    bookingId,
    status: PaymentStatus.pending,
  });

  if (pendingPayment) {
    if (pendingPayment.providerPaymentId) {
      await stripe.paymentIntents.cancel(pendingPayment.providerPaymentId);
    }

    await dbCancelPendingBooking({
      bookingId,
      paymentId: pendingPayment.id,
    });

    return;
  }

  const payment = await dbFindPayment({
    bookingId,
    status: PaymentStatus.paid,
  });

  if (!payment || !payment.providerPaymentId || !payment.amount) {
    throw new Error(
      "Paid Stripe payment not found or payment amount is missing",
    );
  }

  const refundAmount = Math.round(Number(payment.amount) * 100 * 0.75);

  const refund = await stripe.refunds.create(
    {
      amount: refundAmount,
      payment_intent: payment.providerPaymentId,
      reason: "requested_by_customer",
      metadata: {
        bookingId: String(bookingId),
        paymentId: String(payment.id),
      },
    },
    {
      idempotencyKey: `refund-payment-${payment.id}`,
    },
  );

  if (refund.status === "failed" || refund.status === "canceled") {
    throw new Error("Stripe refund failed");
  }

  await dbCancelPaidBooking({ bookingId, paymentId: payment.id });
};
