"use client";

import React from "react";
import { useFilters } from "@/hooks/useFilters";
import { Text } from "@/components/Text";

type SortByListProps = {
  label: string;
  setShowSortList?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSortModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setSortName: React.Dispatch<React.SetStateAction<string>>;
};

export default function SortByList({
  label,
  setShowSortList,
  setOpenSortModal,
  setSortName,
}: SortByListProps) {
  const { setFilter } = useFilters();
  return (
    <button
      onClick={() => {
        setSortName(label);
        setOpenSortModal?.(false);
        setShowSortList?.(false);
        setFilter("sort", label);
      }}
      className="text-left"
    >
      <Text
        as="p"
        color="white60"
        size="sm"
        className="hover:text-accent transition"
      >
        {label}
      </Text>
    </button>
  );
}
