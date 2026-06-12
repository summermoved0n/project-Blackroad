"use client";

import { Button } from "@/components/Button";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";

export default function PayBtn() {
  const onBtnClick = async () => {
    try {
      const response = await axios.post("/api/stripe/payment-intent");
      console.log(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <Button variant="primary" size="sm" onClick={onBtnClick}>
      Pay
    </Button>
  );
}
