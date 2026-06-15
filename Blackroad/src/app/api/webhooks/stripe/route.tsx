import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { dbUpdateBooking } from "@/lib/repositories/booking.repo";
import { BookingStatus } from "../../../../../generated/prisma/enums";

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
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const bookingId = paymentIntent.metadata.bookingId;

    console.log("Payment succeeded for booking:", bookingId);

    // тут потім оновимо booking
    await dbUpdateBooking(
      { id: Number(bookingId) },
      { status: BookingStatus.confirmed },
    );
  }

  return NextResponse.json({ received: true });
}
