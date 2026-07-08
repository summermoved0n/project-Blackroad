"use client";

import { useMediaQuery } from "react-responsive";
import { useFilters } from "@/hooks/useFilters";
import { FilterField } from "@/types/filter.types";
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { Button } from "@/components/Button";
import "react-day-picker/style.css";

type DatePickerProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function DatePicker({ setShowModal }: DatePickerProps) {
  const [selected, setSelected] = useState<DateRange | undefined>();
  const { setFilter } = useFilters();
  const isTablet = useMediaQuery({ minWidth: 768 });

  return (
    <DayPicker
      animate
      mode="range"
      showOutsideDays
      numberOfMonths={isTablet ? 2 : 1}
      selected={selected}
      onSelect={setSelected}
      className="pt-10 w-screen h-screen p-4 flex flex-col items-center justify-start"
      classNames={{
        months:
          "flex gap-15 relative bg-white p-5 md:before:absolute md:before:content-[''] md:before:bg-black/20 md:before:w-px md:before:h-[90%] md:before:top-[5%] md:before:left-1/2",
        weekday: "font-medium text-white bg-black/10",
        nav: "absolute w-full flex justify-between pt-3 pr-9",
        month_caption: "text-xl font-bold py-4 text-center",
        today: `text-xl font-semibold text-red-500`,
        selected: `text-bold text-xl`,
        chevron: `fill-black`,
        range_start: "bg-accent rounded-full text-[18px] font-semibold",
        range_middle: "bg-accent/40 rounded-full text-[16px] font-medium",
        range_end: "bg-accent rounded-full text-[18px] font-semibold",
        outside: "opacity-20",
      }}
      footer={
        <div className="flex justify-between pt-10">
          <Button
            variant="primary"
            className="w-50"
            onClick={() => {
              setShowModal(false);
              setFilter(
                FilterField.dates,
                `${selected?.from?.toISOString() || ""}_${selected?.to?.toISOString() || ""}`,
              );
            }}
          >
            Select
          </Button>
        </div>
      }
    />
  );
}
