"use client";

import { Text } from "@/components/Text";
import { handleApiError } from "@/lib/utility/handleApiError";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const { verificationToken } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/auth/verify", {
          verificationToken,
        });

        setMessage(response.data.message);

        router.replace("/login");
      } catch (error) {
        handleApiError(error);
        setMessage("Account doesn't exist or has already verified");
      }
    };

    verifyEmail();
  }, [verificationToken, router]);

  return (
    <div className="py-10 px-10 w-full">
      <Text as="p" color="white" size="md" className="mb-5">
        {message}
      </Text>
    </div>
  );
}
