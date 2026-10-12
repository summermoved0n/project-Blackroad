import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  dbPaymentSuccess,
  dbRefundFailed,
} from "@/lib/repositories/webhook.repo";
import { dbUpdatePaymentByFilter } from "@/lib/repositories/payment.repo";
import { PaymentStatus } from "../../../../../generated/prisma/enums";
import { resend } from "@/lib/resend";
import BookingConfirmationEmail from "@/emails/BookingConfirmationEmail";
import { dbFindBookingEmailData } from "@/lib/repositories/booking.repo";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ message: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const bookingId = Number(paymentIntent.metadata.bookingId);
    const paymentId = Number(paymentIntent.metadata.paymentId);

    if (!Number.isInteger(bookingId) || !Number.isInteger(paymentId)) {
      throw new Error("Invalid PaymentIntent metadata");
    }

    await dbPaymentSuccess({
      bookingId,
      paymentId,
      providerPaymentId: paymentIntent.id,
    });

    const bookingData = await dbFindBookingEmailData(bookingId);

    if (bookingData) {
      await resend.emails.send({
        from: process.env.RESEND_EMAIL_FROM!,
        to: bookingData.user.email,
        subject: "Confirmation Email from Blackroad",
        react: (
          <BookingConfirmationEmail
            customerName={bookingData.user.name}
            tourTitle={bookingData.tour.title}
            departureDate={new Date(
              bookingData.departure.startDate,
            ).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
            returnDate={new Date(
              bookingData.departure.endDate,
            ).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
            guests={bookingData.adults + bookingData.children}
            room={bookingData.room}
            totalPrice={bookingData.totalPrice.toString()}
            imageUrl={bookingData.tour.imageUrl}
            bookingUrl={`${process.env.BASE_URL}/booking-history`}
          />
        ),
      });
    }
  } else if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const bookingId = Number(paymentIntent.metadata.bookingId);
    const paymentId = Number(paymentIntent.metadata.paymentId);

    if (!Number.isInteger(bookingId) || !Number.isInteger(paymentId)) {
      throw new Error("Invalid PaymentIntent metadata");
    }

    await dbUpdatePaymentByFilter(
      {
        id: paymentId,
        bookingId,
        providerPaymentId: paymentIntent.id,
        status: PaymentStatus.pending,
      },
      {
        errorMessage:
          paymentIntent.last_payment_error?.message || "Payment attempt failed",
      },
    );
  } else if (event.type === "refund.failed") {
    const refund = event.data.object as Stripe.Refund;

    const bookingId = Number(refund.metadata?.bookingId);
    const paymentId = Number(refund.metadata?.paymentId);

    const providerPaymentId =
      typeof refund.payment_intent === "string"
        ? refund.payment_intent
        : refund.payment_intent?.id;

    if (
      !Number.isInteger(bookingId) ||
      !Number.isInteger(paymentId) ||
      !providerPaymentId
    ) {
      throw new Error("Invalid refund metadata");
    }

    await dbRefundFailed({
      bookingId,
      paymentId,
      providerPaymentId,
      errorMessage: refund.failure_reason ?? "Stripe refund failed",
    });
  }

  return NextResponse.json({ received: true });
}
