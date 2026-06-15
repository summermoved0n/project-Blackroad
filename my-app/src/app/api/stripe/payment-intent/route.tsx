import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "cad",
    metadata: {
      bookingId: String(body),
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
