import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createPayment, finishPayment } from "@/lib/services/payment.services";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount } = await createPayment(body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      payment_method_types: ["card"],
      metadata: {
        bookingId: String(body.bookingId),
        paymentId: String(body.paymentId),
      },
    });

    const updateData = {
      paymentId: body.paymentId,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      client_secret: paymentIntent.client_secret,
    };

    await finishPayment(updateData);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
