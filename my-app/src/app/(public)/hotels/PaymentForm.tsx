"use client";

import { CardIcon } from "@/components/icons";
import { Text } from "@/components/Text";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import clsx from "clsx";
import { useState } from "react";

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
  const [focused, setFocused] = useState<"number" | "expiry" | "cvc" | null>(
    null,
  );
  return (
    <div>
      <Text as="h3" color="white" size="md" className="mb-7.5">
        Payment Information
      </Text>

      <div className="grid gap-10">
        <div>
          <label className="text-white/60">Card number</label>
          <div
            className={clsx(
              "relative border-b px-7.5 py-3 transition",
              focused === "number" ? "border-accent " : "border-white/20",
            )}
          >
            <CardNumberElement
              options={elementOptions}
              onFocus={() => setFocused("number")}
              onBlur={() => setFocused(null)}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2">
              <CardIcon />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:gap-10">
          <div>
            <label className="text-white/60">Expiration date</label>
            <div
              className={clsx(
                "border-b py-3 transition",
                focused === "expiry" ? "border-accent " : "border-white/20",
              )}
            >
              <CardExpiryElement
                options={elementOptions}
                onFocus={() => setFocused("expiry")}
                onBlur={() => setFocused(null)}
              />
            </div>
          </div>

          <div>
            <label className="text-white/60">CVC-code</label>
            <div
              className={clsx(
                "relative border-b px-7.5 py-3 transition",
                focused === "cvc" ? "border-accent " : "border-white/20",
              )}
            >
              <CardCvcElement
                options={elementOptions}
                onFocus={() => setFocused("cvc")}
                onBlur={() => setFocused(null)}
              />
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
