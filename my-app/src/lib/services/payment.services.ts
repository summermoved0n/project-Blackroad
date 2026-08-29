import {
  BookingStatus,
  DepartureStatus,
  PaymentStatus,
} from "../../../generated/prisma/enums";
import { dbFindUser } from "../repositories/auth.repo";
import { dbFindBookingById } from "../repositories/booking.repo";
import {
  dbAttachPaymentIntent,
  dbFindPaymentById,
} from "../repositories/payment.repo";
import { getCurrentUser } from "../utility/getCurrentUser";
import { dbExpirePendingBooking } from "../repositories/profile.repo";

type CreateProps = { bookingId: number; paymentId: number };
type FinishPaymentProps = {
  bookingId: number;
  paymentId: number;
  paymentIntentId: string;
  amount: number;
  client_secret: string | null;
};

export const createPayment = async ({ bookingId, paymentId }: CreateProps) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("Please sign up or log in first to book the tour");
  }

  const user = await dbFindUser({ id: userId });

  if (!user) {
    throw new Error("Wrong user Id or can't find this user");
  }

  const booking = await dbFindBookingById(bookingId);

  if (booking?.userId !== user.id) {
    throw new Error("Forbidden");
  }

  if (booking?.status !== BookingStatus.pending) {
    throw new Error("Booking not found or wrong status");
  }

  if (!booking.expiresAt || booking.expiresAt <= new Date()) {
    await dbExpirePendingBooking({ bookingId: booking.id });
    throw new Error("Booking has expired");
  }

  if (
    booking.departure.tourId !== booking.tourId ||
    booking.departure.startDate <= new Date() ||
    booking.departure.status === DepartureStatus.cancelled ||
    booking.departure.status === DepartureStatus.completed
  ) {
    throw new Error("Booking departure is no longer valid for payment");
  }

  const payment = await dbFindPaymentById(paymentId);

  if (
    payment?.status !== PaymentStatus.pending ||
    payment?.bookingId !== booking?.id
  ) {
    throw new Error("Payment not found or wrong status");
  }

  return {
    amount: Math.round(Number(booking.totalPrice) * 100),
    payment,
  };
};

export const finishPayment = async ({
  bookingId,
  paymentId,
  paymentIntentId,
  amount,
  client_secret,
}: FinishPaymentProps) => {
  const payment = await dbFindPaymentById(paymentId);

  if (!payment) {
    throw new Error("Payment does not exist");
  }

  const result = await dbAttachPaymentIntent(paymentId, {
    providerPaymentId: paymentIntentId,
    amount: amount / 100,
    clientSecret: client_secret,
  });

  if (result.count === 0) {
    await dbExpirePendingBooking({ bookingId });

    const attachedPayment = await dbFindPaymentById(paymentId);

    if (
      attachedPayment?.providerPaymentId === paymentIntentId &&
      attachedPayment.clientSecret
    ) {
      return attachedPayment.clientSecret;
    }

    throw new Error("Payment is no longer available");
  }

  return client_secret;
};
