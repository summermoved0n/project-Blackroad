"use client";

import { Button } from "@/components/Button";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import { SetStateAction } from "react";

type PayBtnProps = {
  setSecret: React.Dispatch<SetStateAction<string>>;
};

export default function PayBtn({ setSecret }: PayBtnProps) {
  const onBtnClick = async () => {
    try {
      const response = await axios.post("/api/stripe/payment-intent", "4");
      setSecret(response.data.clientSecret);
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
