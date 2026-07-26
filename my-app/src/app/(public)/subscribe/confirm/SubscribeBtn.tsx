"use client";

import { Button } from "@/components/Button";
import Spinner from "@/components/ui/loader/Spinner";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubscribeBtn({ token }: { token: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onBtnClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/subscribe/confirm", { token });
      toast.success(response.data.message);
      router.replace("/");
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="primary" size="sm" onClick={onBtnClick}>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="sm" />
        </div>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
}
