"use client";

import { MenuDotIcon } from "@/components/icons/MenuDotIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";

type DotButtonMenuProps = {
  setMenuItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export enum MenuItem {
  BookingAgain = "Booking Again",
  LeaveReview = "Leave Review",
  CancelBooking = "Cancel Booking",
}

export default function DotButtonMenu({ setMenuItem }: DotButtonMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowMenu(false));

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
        <div className="absolute w-40 bg-white text-black right-0 top-10 shadow-lg">
          <button
            className="px-4 py-2 hover:bg-gray-200"
            type="button"
            onClick={() => setMenuItem(MenuItem.BookingAgain)}
          >
            {MenuItem.BookingAgain}
          </button>
          <button
            className="px-4 py-2 hover:bg-gray-200"
            type="button"
            onClick={() => setMenuItem(MenuItem.LeaveReview)}
          >
            {MenuItem.LeaveReview}
          </button>
          <button
            className="px-4 py-2 hover:bg-gray-200"
            type="button"
            onClick={() => setMenuItem(MenuItem.CancelBooking)}
          >
            {MenuItem.CancelBooking}
          </button>
        </div>
      )}
    </div>
  );
}
