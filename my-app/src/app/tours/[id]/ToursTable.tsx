"use client";

import { Button } from "@/app/components/Button";
import { Text } from "@/app/components/Text";
import clsx from "clsx";
import { useState } from "react";

type ToursTableProps = {
  id: number;
  departure: string;
  return: string;
  cityFrom: string;
  price: number;
};

export default function ToursTable({ data }: { data: ToursTableProps[] }) {
  const [selectedRoom, setSelectedRoom] = useState("single");

  return (
    <div className="hidden md:block overflow-x-auto py-15 px-15 bg-[#171717]">
      <table className="w-full">
        <thead className="text-white text-left text-md">
          <tr>
            <th className="pb-4 font-light">Date of departure</th>
            <th className="pb-4 font-light">Date of return</th>
            <th className="pb-4 font-light">Choose a room</th>
            <th className="pb-4 font-light">Price</th>
            <th className="pb-4 font-light"></th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            ({
              id,
              departure: departureDate,
              return: returnDate,
              cityFrom,
              price,
            }) => (
              <tr key={id} className="border-y border-white/20">
                <td className="py-5">
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
                    <span className="text-[rgba(234,156,63,0.6)]">
                      {cityFrom}
                    </span>
                  </Text>
                </td>
                <td className="py-5">
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
                    Departure from{" "}
                    <span className="text-[rgba(234,156,63,0.6)]">
                      {cityFrom}
                    </span>
                  </Text>
                </td>
                <td className="py-5">
                  <button
                    type="button"
                    className={clsx(
                      "h-12.5 w-30",
                      selectedRoom === "single" && "bg-[#ea9c3f]",
                    )}
                    onClick={() => setSelectedRoom("single")}
                  >
                    <span
                      className={
                        selectedRoom === "single"
                          ? "text-white"
                          : "text-white/50"
                      }
                    >
                      Single
                    </span>
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      "h-12.5 w-30",
                      selectedRoom === "double" && "bg-[#ea9c3f]",
                    )}
                    onClick={() => setSelectedRoom("double")}
                  >
                    <span
                      className={
                        selectedRoom === "double"
                          ? "text-white"
                          : "text-white/50"
                      }
                    >
                      Double
                    </span>
                  </button>
                </td>
                <td className="py-5 text-white">{price} CA$</td>
                <td className="text-right py-5">
                  <Button variant="primary" size="sm">
                    Book now
                  </Button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
