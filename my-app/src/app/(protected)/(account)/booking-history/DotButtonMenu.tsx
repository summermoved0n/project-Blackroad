"use client";

import { MenuDotIcon } from "@/components/icons/MenuDotIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { UserReviewPayload } from "@/types/profile.types";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BookingStatus } from "../../../../../generated/prisma/client";

type DotButtonMenuProps = {
  userId: number;
  tourId: number;
  status: BookingStatus;
  setMenuItem: React.Dispatch<React.SetStateAction<string | null>>;
  userReviews: UserReviewPayload[];
};

export enum MenuItem {
  BookingAgain = "Booking Again",
  LeaveReview = "Leave Review",
  CancelBooking = "Cancel Booking",
}

export default function DotButtonMenu({
  userReviews,
  userId,
  tourId,
  status,
  setMenuItem,
}: DotButtonMenuProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowMenu(false));

  const isDisabledReviewBtn = () => {
    const isUserAndTourMatch = userReviews.some(
      (review) => review.tourId === tourId && review.author.id === userId,
    );

    const isStatusComplited = status !== "completed";
    return isUserAndTourMatch || isStatusComplited;
  };

  const isDisabledCancelBookingBtn = () => {
    const isUserAndTourMatch = userReviews.some(
      (review) => review.tourId === tourId && review.author.id === userId,
    );

    const isStatusComplited = status === "cancelled";
    return isUserAndTourMatch || isStatusComplited;
  };

  return (
    <div ref={containerRef} className="relative w-8">
      <button
        className="w-full h-full flex items-center justify-center"
        type="button"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <MenuDotIcon />
      </button>

      {showMenu && (
        <div className="absolute w-42 bg-white text-black right-0 top-10 shadow-lg">
          <button
            className="px-4 py-2 hover:bg-gray-200"
            type="button"
            onClick={() => {
              setMenuItem(MenuItem.BookingAgain);
              setShowMenu(false);
              router.push(`/tours/${tourId}`);
            }}
          >
            {MenuItem.BookingAgain}
          </button>
          <button
            className="px-4 py-2 hover:bg-gray-200 disabled:text-gray-400"
            type="button"
            disabled={isDisabledReviewBtn()}
            onClick={() => {
              setMenuItem(MenuItem.LeaveReview);
              setShowMenu(false);
            }}
          >
            {MenuItem.LeaveReview}
          </button>
          <button
            className="px-4 py-2 hover:bg-gray-200 disabled:text-gray-400"
            type="button"
            disabled={isDisabledCancelBookingBtn()}
            onClick={() => {
              setMenuItem(MenuItem.CancelBooking);
              setShowMenu(false);
            }}
          >
            {MenuItem.CancelBooking}
          </button>
        </div>
      )}
    </div>
  );
}
