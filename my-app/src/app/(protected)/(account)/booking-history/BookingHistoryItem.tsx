"use client";

import Image from "next/image";
import { Text } from "@/components/Text";
import { clsx } from "clsx";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";
import DotButtonMenu, { MenuItem } from "./DotButtonMenu";
import { useState } from "react";
import LeaveReview from "./LeaveReview";
import CancelBooking from "./CancelBooking";
import { UserReviewPayload } from "@/types/profile.types";

type BookingHistoryItemProps = {
  userId: number;
  bookingId: number;
  totalPrice: string;
  status: string;
  tour: {
    id: number;
    title: string;
    slug: string;
    imageUrl: string;
    departures: {
      id: number;
      tourId: number;
      status: string;
      startDate: Date;
      endDate: Date;
      departureCity: string;
    }[];
  };
  userReviews: UserReviewPayload[];
};

export default function BookingHistoryItem({
  bookingId,
  userReviews,
  userId,
  totalPrice,
  tour,
  status,
}: BookingHistoryItemProps) {
  const [menuItem, setMenuItem] = useState<string | null>(null);

  return (
    <>
      <li className="bg-white md:h-35 flex flex-col md:flex-row">
        <div className="relative md:w-40 h-75 md:h-full">
          <Image
            src={tour.imageUrl}
            alt={tour.title}
            fill
            loading="eager"
            className="w-full h-48 object-top md:object-center object-cover mb-3"
          />
        </div>
        <div className="w-full flex justify-between p-5">
          <div className="flex flex-col justify-between gap-2">
            <Text as="h2" color="black" size="md">
              {tour.title}
            </Text>

            <Text as="p" color="black60" size="sm">
              {new Date(tour.departures[0].startDate).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                },
              )}{" "}
              -{" "}
              {new Date(tour.departures[0].endDate).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "short",
                },
              )}
            </Text>

            <Text as="h2" color="black" size="md" className="md:hidden h-fit">
              {totalPrice} CA$
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
            <Text
              as="h2"
              color="black"
              size="md"
              className="hidden md:block h-fit"
            >
              {totalPrice} CA$
            </Text>

            <DotButtonMenu
              userId={userId}
              tourSlug={tour.slug}
              status={status}
              userReviews={userReviews}
              setMenuItem={setMenuItem}
            />
          </div>
        </div>
      </li>

      {menuItem === MenuItem.LeaveReview && (
        <LeaveReview
          key={MenuItem.LeaveReview}
          bookingId={bookingId}
          setMenuItem={setMenuItem}
        />
      )}
      {menuItem === MenuItem.CancelBooking && (
        <CancelBooking
          key={MenuItem.CancelBooking}
          bookingId={bookingId}
          setMenuItem={setMenuItem}
        />
      )}
    </>
  );
}
