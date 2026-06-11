"use client";

import React from "react";
import { Button } from "./Button";
import { clsx } from "clsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { handleApiError } from "@/lib/utility/handleApiError";

export default function SubscribeField({
  isKeepInTouch,
}: {
  isKeepInTouch?: boolean;
}) {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/subscribe", { email });
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={clsx(
        isKeepInTouch && "xl:w-180",
        "w-full flex flex-col md:flex-row gap-5 md:gap-2.5 mb-12.5",
      )}
    >
      <input
        name="email"
        type="email"
        placeholder={isKeepInTouch ? "Enter email" : "email@gmail.com"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={clsx(
          isKeepInTouch && "border focus:border-accent",
          "w-full h-12.5 px-4 text-sm text-white placeholder-white/50 bg-transparent border-b border-white/10 focus:outline-none focus:border-b-accent",
        )}
      />

      <Button variant="primary" size="sm" type="submit">
        Subscribe
      </Button>
    </form>
  );
}
