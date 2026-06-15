"use client";

import { Button } from "@/components/Button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div>
      <PaymentElement />

      <Button variant="primary" size="sm" onClick={handleSubmit}>
        Book and pay
      </Button>
    </div>
  );
}
