import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "cad",
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
