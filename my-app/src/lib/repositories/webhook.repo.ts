import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../prisma";

export const dbPaymentSuccess = async ({
  bookingId,
  paymentId,
  providerPaymentId,
}: {
  bookingId: number;
  paymentId: number;
  providerPaymentId: string;
}) =>
  prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: { id: paymentId },
    });

    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
    });

    if (!payment || !booking) {
      throw new Error("Booking or payment not found");
    }

    if (
      payment.bookingId !== booking.id ||
      payment.providerPaymentId !== providerPaymentId
    ) {
      throw new Error("Stripe payment does not match booking");
    }

    if (
      payment.status === PaymentStatus.paid &&
      booking.status === BookingStatus.confirmed
    ) {
      return;
    }

    if (
      payment.status !== PaymentStatus.pending ||
      booking.status !== BookingStatus.pending
    ) {
      return;
    }

    await tx.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.paid,
        errorMessage: null,
      },
    });

    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.confirmed,
      },
    });
  });

export const dbRefundFailed = async ({
  bookingId,
  paymentId,
  providerPaymentId,
  errorMessage,
}: {
  bookingId: number;
  paymentId: number;
  providerPaymentId: string;
  errorMessage: string;
}) =>
  prisma.payment.updateMany({
    where: {
      id: paymentId,
      bookingId,
      providerPaymentId,
      status: PaymentStatus.refunded,
    },
    data: {
      status: PaymentStatus.paid,
      errorMessage,
    },
  });
