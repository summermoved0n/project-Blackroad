import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../prisma";
import { dbExpirePendingBooking } from "./profile.repo";

export type PaymentSuccessResult =
  | "confirmed"
  | "already_confirmed"
  | "reconciliation_required"
  | "ignored";

export const dbPaymentSuccess = async ({
  bookingId,
  paymentId,
  providerPaymentId,
}: {
  bookingId: number;
  paymentId: number;
  providerPaymentId: string;
}) => {
  await dbExpirePendingBooking({ bookingId });

  return prisma.$transaction(async (tx): Promise<PaymentSuccessResult> => {
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

    const departure = await tx.tourDeparture.findUnique({
      where: { id: booking.departureId },
    });

    if (!departure || departure.tourId !== booking.tourId) {
      throw new Error("Booking departure not found or does not match tour");
    }

    if (
      payment.status === PaymentStatus.paid &&
      booking.status === BookingStatus.confirmed
    ) {
      return "already_confirmed";
    }

    if (booking.status === BookingStatus.cancelled) {
      const reconciliation = await tx.payment.updateMany({
        where: {
          id: paymentId,
          bookingId,
          providerPaymentId,
          status: { in: [PaymentStatus.pending, PaymentStatus.failed] },
        },
        data: {
          status: PaymentStatus.refund_required,
          errorMessage:
            "Stripe payment succeeded after the booking was cancelled or expired",
        },
      });

      return reconciliation.count === 1
        ? "reconciliation_required"
        : "ignored";
    }

    if (
      payment.status !== PaymentStatus.pending ||
      booking.status !== BookingStatus.pending
    ) {
      return "ignored";
    }

    const bookingUpdate = await tx.booking.updateMany({
      where: {
        id: bookingId,
        status: BookingStatus.pending,
        expiresAt: { gt: new Date() },
      },
      data: {
        status: BookingStatus.confirmed,
      },
    });

    if (bookingUpdate.count !== 1) {
      return "ignored";
    }

    const paymentUpdate = await tx.payment.updateMany({
      where: {
        id: paymentId,
        bookingId,
        providerPaymentId,
        status: PaymentStatus.pending,
      },
      data: {
        status: PaymentStatus.paid,
        errorMessage: null,
      },
    });

    if (paymentUpdate.count !== 1) {
      throw new Error("Payment state changed while confirming booking");
    }

    return "confirmed";
  });
};

type RefundTransitionProps = {
  bookingId: number;
  paymentId: number;
  providerPaymentId: string;
  providerRefundId: string;
};

export const dbRefundSucceeded = async ({
  bookingId,
  paymentId,
  providerPaymentId,
  providerRefundId,
}: RefundTransitionProps) =>
  prisma.payment.updateMany({
    where: {
      id: paymentId,
      bookingId,
      providerPaymentId,
      OR: [{ providerRefundId }, { providerRefundId: null }],
      status: PaymentStatus.refund_pending,
      booking: { status: BookingStatus.cancelled },
    },
    data: {
      status: PaymentStatus.refunded,
      providerRefundId,
      errorMessage: null,
    },
  });

export const dbRefundFailed = async ({
  bookingId,
  paymentId,
  providerPaymentId,
  providerRefundId,
  errorMessage,
}: {
  bookingId: number;
  paymentId: number;
  providerPaymentId: string;
  providerRefundId: string;
  errorMessage: string;
}) =>
  prisma.payment.updateMany({
    where: {
      id: paymentId,
      bookingId,
      providerPaymentId,
      OR: [{ providerRefundId }, { providerRefundId: null }],
      status: PaymentStatus.refund_pending,
      booking: { status: BookingStatus.cancelled },
    },
    data: {
      status: PaymentStatus.refund_failed,
      providerRefundId,
      errorMessage,
    },
  });
