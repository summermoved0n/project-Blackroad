"use client";

import { useRef, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import SelectPeopleAndRoomsItem from "./SelectPeopleAndRoomsItem";
import { useClickOutside } from "@/hooks/useClickOutside";
import { FilterField } from "@/types/filter.types";

export default function SelectPeopleAndRooms() {
  const { searchParams } = useFilters();

  const adults = searchParams.get(FilterField.adults) || "2";
  const children = searchParams.get(FilterField.children) || "0";
  const rooms = searchParams.get(FilterField.rooms) || "1";

  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowModal(false));

  return (
    <div ref={containerRef} className="relative flex my-5">
      <button
        type="button"
        className="w-full flex items-center justify-between py-5 border-b border-white/10 text-white hover:border-accent focus:border-accent transition"
        onClick={() => setShowModal(!showModal)}
      >
        {`${adults} adults, ${children} children, ${rooms} room`}
        <ArrowDownIcon />
      </button>

      {showModal && (
        <div className="absolute top-full w-full px-2.5 py-2.5 xl:px-7.5 xl:py-7.5 flex flex-col gap-5 bg-white z-20">
          <SelectPeopleAndRoomsItem
            title={FilterField.adults}
            currentValue={adults}
          />
          <SelectPeopleAndRoomsItem
            title={FilterField.children}
            currentValue={children}
          />
          <SelectPeopleAndRoomsItem
            title={FilterField.rooms}
            currentValue={rooms}
          />
        </div>
      )}
    </div>
  );
}
