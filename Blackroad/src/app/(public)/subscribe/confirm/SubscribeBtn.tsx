"use client";

import { Button } from "@/components/Button";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SubscribeBtn({ token }: { token: string }) {
  const router = useRouter();
  const onBtnClick = async () => {
    try {
      const response = await axios.post("/api/subscribe/confirm", { token });
      toast.success(response.data.message);
      router.replace("/");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Button variant="primary" size="sm" onClick={onBtnClick}>
      Subscribe
    </Button>
  );
}
