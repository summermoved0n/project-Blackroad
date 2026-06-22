import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createPayment } from "@/lib/services/payment.services";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  const data = await createPayment(body);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "cad",
    payment_method_types: ["card"],
    metadata: {
      bookingId: String(body),
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
