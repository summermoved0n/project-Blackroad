"use client";

import { useState } from "react";
import PayBtn from "./PayBtn";
import PaymentElementWrapper from "./PaymentElementWrapper";

export default function PayContainer() {
  const [secret, setSecret] = useState<string>("");
  return (
    <div>
      <PayBtn setSecret={setSecret} />
      {secret && <PaymentElementWrapper clientSecret={secret} />}
    </div>
  );
}
