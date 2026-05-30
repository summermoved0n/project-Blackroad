"use client";

import Image from "next/image";
import { Text } from "@/components/Text";
import { BookingStatus } from "../../../../../generated/prisma/client";
import { clsx } from "clsx";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";
import DotButtonMenu, { MenuItem } from "./DotButtonMenu";
import { useState } from "react";
import BookingAgain from "./BookingAgain";
import LeaveReview from "./LeaveReview";
import CancelBooking from "./CancelBooking";

type BookingHistoryItemProps = {
  totalPrice: string;
  status: BookingStatus;
  tour: {
    title: string;
    imageUrl: string;
    dateOfArrival: Date;
    dateOfDeparture: Date;
  };
};

export default function BookingHistoryItem({
  totalPrice,
  tour,
  status,
}: BookingHistoryItemProps) {
  
  const [menuItem, setMenuItem] = useState<string | null>(null);

  return (
    <>
      <li className="bg-white h-35 flex ">
        <div className="relative w-40 h-full">
          <Image
            src={tour.imageUrl}
            alt={tour.title}
            fill
            loading="eager"
            className="w-full h-48 object-cover mb-3"
          />
        </div>
        <div className="w-full flex justify-between p-5">
          <div className="flex flex-col justify-between">
            <Text as="h2" color="black" size="md">
              {tour.title}
            </Text>

            <Text as="p" color="black60" size="sm">
              {new Date(tour.dateOfArrival).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(tour.dateOfDeparture).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </Text>

            <Text
              as="p"
              color="black"
              size="sm"
              className={clsx(
                status === "pending" && "text-yellow-500",
                status === "confirmed" && "text-green-500",
                status === "cancelled" && "text-red-500",
                status === "completed" && "text-gray-500",
              )}
            >
              {capitalizeFirstLetter(status)}
            </Text>
          </div>

          <div className="flex h-fit">
            <Text as="h2" color="black" size="md" className="h-fit">
              {totalPrice} CA$
            </Text>

            <DotButtonMenu setMenuItem={setMenuItem} />
          </div>
        </div>
      </li>

      {menuItem === MenuItem.BookingAgain && (
        <BookingAgain key={MenuItem.BookingAgain} />
      )}
      {menuItem === MenuItem.LeaveReview && (
        <LeaveReview key={MenuItem.LeaveReview} setMenuItem={setMenuItem} />
      )}
      {menuItem === MenuItem.CancelBooking && (
        <CancelBooking key={MenuItem.CancelBooking} />
      )}
    </>
  );
}
