"use client";

import { CardIcon } from "@/components/icons";
import { Text } from "@/components/Text";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const elementOptions = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "16px",
      "::placeholder": {
        color: "rgba(255, 255, 255, 0.2)",
        fontSize: "16px",
        fontWeight: "300",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

export default function PaymentForm() {
  return (
    <div>
      <Text as="h3" color="white" size="md" className="mb-7.5">
        Payment Information
      </Text>

      <div className="grid gap-10">
        <div>
          <label className="text-white/60">Card number</label>
          <div className="relative border-b border-white/20 px-7.5 py-3">
            <CardNumberElement options={elementOptions} />
            <span className="absolute left-0 top-1/2 -translate-y-1/2">
              <CardIcon />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-10">
          <div>
            <label className="text-white/60">Expiration date</label>
            <div className="border-b border-white/20 py-3">
              <CardExpiryElement options={elementOptions} />
            </div>
          </div>

          <div>
            <label className="text-white/60">CVC-code</label>
            <div className="relative border-b border-white/20 px-7.5 py-3">
              <CardCvcElement options={elementOptions} />
              <span className="absolute left-0 top-1/2 -translate-y-1/2">
                <CardIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
