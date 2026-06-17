"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";
import PaymentForm from "./PaymentForm";

type Props = {
  clientSecret: string;
};

export default function PaymentElementWrapper({ clientSecret }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#ea9c3f",
            colorBackground: "#171717",
            colorText: "#ffffff",
            colorDanger: "#ef4444",
            borderRadius: "0px",
            inputColorBorder: "transparent",
            inputBoxShadow: "none",
          },
        },
      }}
    >
      <PaymentForm clientSecret={clientSecret} />
    </Elements>
  );
}
