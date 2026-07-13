"use client";

import { Dispatch, SetStateAction } from "react";
import { Text } from "./Text";
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
    <div className="relative flex">
      <button
        type="button"
        className="w-full flex items-end pb-5"
        onClick={() => setShowModal(true)}
      >
        <Text
          as="p"
          color="white"
          size="sm"
          className="w-full flex items-center justify-between py-5 md:py-2 border-b border-white/10 hover:border-accent transition"
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
        </Text>
      </button>
    </div>
  );
}
