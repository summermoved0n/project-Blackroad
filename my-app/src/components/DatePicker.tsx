"use client";

import { useFilters } from "@/hooks/useFilters";
import { FilterField } from "@/types/filter.types";
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DatePickerProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function DatePicker({ setShowModal }: DatePickerProps) {
  const [selected, setSelected] = useState<DateRange | undefined>();
  const { setFilter } = useFilters();

  return (
    <DayPicker
      animate
      mode="range"
      numberOfMonths={2}
      selected={selected}
      onSelect={setSelected}
      className="bg-white/30 p-4"
      classNames={{
        months: "flex gap-5 relative",
        weekday: "font-medium text-white bg-black/10",
        nav: "absolute w-full flex justify-between pt-4",
        month_caption: "text-xl font-bold py-4 text-center",
        today: `text-xl font-semibold text-red-500`,
        selected: `text-bold text-xl`,
        chevron: `fill-white`,
        range_start: "bg-accent rounded-l-full text-[22px] font-semibold",
        range_middle: "bg-accent/40 text-[18px] font-medium",
        range_end: "bg-accent rounded-r-full text-[22px] font-semibold",
      }}
      footer={
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              setFilter(
                FilterField.dates,
                `${selected!.from?.toISOString() || ""}_${selected!.to?.toISOString() || ""}`,
              );
            }}
          >
            Select
          </button>
        </div>
      }
    />
  );
}
