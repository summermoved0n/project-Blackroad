"use client";

import { stripePromise } from "@/lib/stripe-client";
import { UserPayload } from "@/types/user.types";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "./BookingForm";

export default function BookingStripeForm({
  user,
  tourId,
}: {
  user: UserPayload;
  tourId: number;
}) {
  return (
    <>
      <Elements stripe={stripePromise}>
        <BookingForm user={user} tourId={tourId} />
      </Elements>
    </>
  );
}
