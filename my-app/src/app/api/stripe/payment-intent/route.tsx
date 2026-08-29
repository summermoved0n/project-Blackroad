import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createPayment, finishPayment } from "@/lib/services/payment.services";
import { enforceRateLimit } from "@/lib/utility/rateLimit";
import { getPublicErrorMessage } from "@/lib/utility/publicError";

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, "stripe:payment-intent", {
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (limited) return limited;

  try {
    const body = await req.json();

    const { amount, payment } = await createPayment(body);

    if (payment.providerPaymentId && payment.clientSecret) {
      return NextResponse.json({
        clientSecret: payment.clientSecret,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount,
        currency: "cad",
        payment_method_types: ["card"],
        metadata: {
          bookingId: String(body.bookingId),
          paymentId: String(body.paymentId),
        },
      },
      {
        idempotencyKey: `payment-${body.paymentId}`,
      },
    );

    const updateData = {
      bookingId: body.bookingId,
      paymentId: body.paymentId,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      client_secret: paymentIntent.client_secret,
    };

    const clientSecret = await finishPayment(updateData);

    return NextResponse.json({
      clientSecret,
    });
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to initialize payment") },
      { status: 400 },
    );
  }
}
