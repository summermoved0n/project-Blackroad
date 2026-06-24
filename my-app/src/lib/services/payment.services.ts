import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
import { dbFindUser } from "../repositories/auth.repo";
import { dbFindBookingById } from "../repositories/booking.repo";
import {
  dbFindPaymentById,
  dbUpdatePaymentById,
} from "../repositories/payment.repo";
import { getCurrentUser } from "../utility/getCurrentUser";

type CreateProps = { bookingId: number; paymentId: number };
type FinishPaymentProps = {
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

  if (booking?.status !== BookingStatus.pending) {
    throw new Error("Booking not found or wrong status");
  }

  const payment = await dbFindPaymentById(paymentId);

  if (
    payment?.status !== PaymentStatus.pending &&
    payment?.bookingId !== booking?.id
  ) {
    throw new Error("Payment not found or wrong status");
  }

  return {
    amount: Math.round(Number(booking.totalPrice) * 100),
  };
};

export const finishPayment = async ({
  paymentId,
  paymentIntentId,
  amount,
  client_secret,
}: FinishPaymentProps) => {
  const payment = await dbFindPaymentById(paymentId);
  
  if (!payment) {
    throw new Error("Payment does not exist");
  }

  await dbUpdatePaymentById(paymentId, {
    providerPaymentId: paymentIntentId,
    amount,
    clientSecret: client_secret,
  });
};
