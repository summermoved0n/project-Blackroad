"use client";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ToursTabelMobileProps = {
  slug: string;
  tourDate: {
    id: number;
    tourId: number;
    startDate: Date;
    endDate: Date;
    departureCity: string;
    status: string;
  };
};

export default function ToursTabelMobile({
  tourDate,
  slug,
}: ToursTabelMobileProps) {
  const router = useRouter();
  const { startDate, endDate, departureCity } = tourDate;
  const [selectedRoom, setSelectedRoom] = useState("single");

  return (
    <div className="py-12.5 border-b border-white/10">
      <div className="flex justify-between items-start mb-12.5">
        <div>
          <Text as="p" color="white" size="sm" className="mb-4">
            Departure date
          </Text>

          <Text as="p" color="white60" size="sm">
            {new Date(startDate).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </Text>
          <Text as="p" color="white" size="md">
            {new Date(startDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Text as="p" color="white60" size="sm">
            Departure from{" "}
            <span className="text-accent/60">{departureCity}</span>
          </Text>
        </div>

        <div className="">
          <Text as="p" color="white" size="sm" className="mb-4">
            Return date
          </Text>

          <Text as="p" color="white60" size="sm">
            {new Date(endDate).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </Text>
          <Text as="p" color="white" size="md">
            {new Date(endDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Text as="p" color="white60" size="sm">
            Return to <span className="text-accent/60">{departureCity}</span>
          </Text>
        </div>
      </div>

      <Text as="p" color="white" size="sm" className="mb-4">
        Select room
      </Text>

      <div className="flex mb-12.5">
        <button
          type="button"
          className={clsx(
            "h-12.5 w-full border border-transparent transition focus:border-white",
            selectedRoom === "single" && "bg-accent",
          )}
          onClick={() => setSelectedRoom("single")}
        >
          <span
            className={
              selectedRoom === "single" ? "text-white" : "text-white/50"
            }
          >
            Single
          </span>
        </button>
        <button
          type="button"
          className={clsx(
            "h-12.5 w-full border border-transparent transition focus:border-white",
            selectedRoom === "double" && "bg-accent",
          )}
          onClick={() => setSelectedRoom("double")}
        >
          <span
            className={
              selectedRoom === "double" ? "text-white" : "text-white/50"
            }
          >
            Double
          </span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-12.5">
        <Text as="p" color="white" className="text-xl mb-4">
          Price
        </Text>

        <Text as="p" color="white" className="text-xl mb-4">
          {(selectedRoom === "single" && 500) ||
            (selectedRoom === "double" && 600)}{" "}
          CA$
        </Text>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={() => router.push(`${slug}/booking`)}
      >
        Book now
      </Button>
    </div>
  );
}
