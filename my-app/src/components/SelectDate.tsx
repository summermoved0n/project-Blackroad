"use client";

import { Dispatch, SetStateAction } from "react";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { useFilters } from "@/hooks/useFilters";

type SelectDateProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function SelectDate({ setShowModal }: SelectDateProps) {
  const { searchParams } = useFilters();
  const pickDate = searchParams.get("dates")?.split("_") as
    | [string, string]
    | null;
  return (
    <div className="relative flex my-5">
      <button
        type="button"
        className="w-full flex items-center justify-between py-5 border-b border-white/10 text-white hover:border-accent focus:border-accent transition"
        onClick={() => setShowModal(true)}
      >
        {!pickDate
          ? "Select date"
          : `${new Date(pickDate[0]).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })} - ${new Date(pickDate[1]).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}`}
        <ArrowDownIcon />
      </button>
    </div>
  );
}
