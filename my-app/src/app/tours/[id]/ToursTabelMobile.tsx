"use client";

import { Button } from "@/app/components/Button";
import { Text } from "@/app/components/Text";
import clsx from "clsx";
import { useState } from "react";

type ToursTabelMobileProps = {
  departureDate: string;
  cityFrom: string;
  returnDate: string;
  price: number;
};

export default function ToursTabelMobile({
  departureDate,
  cityFrom,
  returnDate,
  price,
}: ToursTabelMobileProps) {
  const [selectedRoom, setSelectedRoom] = useState("single");

  return (
    <div className="py-12.5 border-b border-white/10">
      <div className="flex justify-between items-start mb-12.5">
        <div>
          <Text as="p" color="white" size="sm" className="mb-4">
            Departure date
          </Text>

          <Text as="p" color="white60" size="sm">
            {new Date(departureDate).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </Text>
          <Text as="p" color="white" size="md">
            {new Date(departureDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Text as="p" color="white60" size="sm">
            Departure from{" "}
            <span className="text-[rgba(234,156,63,0.6)]">{cityFrom}</span>
          </Text>
        </div>

        <div className="">
          <Text as="p" color="white" size="sm" className="mb-4">
            Return date
          </Text>

          <Text as="p" color="white60" size="sm">
            {new Date(returnDate).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </Text>
          <Text as="p" color="white" size="md">
            {new Date(returnDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Text as="p" color="white60" size="sm">
            Return to{" "}
            <span className="text-[rgba(234,156,63,0.6)]">{cityFrom}</span>
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
            "h-12.5 w-full",
            selectedRoom === "single" && "bg-[#ea9c3f]",
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
            "h-12.5 w-full",
            selectedRoom === "double" && "bg-[#ea9c3f]",
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
          {price} CA$
        </Text>
      </div>

      <Button variant="primary" size="sm">
        Book now
      </Button>
    </div>
  );
}
