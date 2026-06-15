import React from "react";
import { useFilters } from "@/hooks/useFilters";
import { Text } from "./Text";
import { MinusIcon } from "@/components/icons/MinusIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";

type SelectPeopleAndRoomsItem = {
  title: string;
  currentValue: string;
};

export default function SelectPeopleAndRoomsItem({
  title,
  currentValue,
}: SelectPeopleAndRoomsItem) {
  const { setFilter } = useFilters();

  return (
    <div className="flex justify-between">
      <Text as="p" color="black" size="sm">
        {capitalizeFirstLetter(title)}
      </Text>
      <div className="flex gap-2 xl:gap-5">
        <button
          type="button"
          onClick={() => {
            setFilter(title, (parseInt(currentValue) - 1).toString());
          }}
          disabled={currentValue === "0"}
        >
          <MinusIcon />
        </button>
        <Text as="p" color="black" size="sm">
          {currentValue}
        </Text>
        <button
          type="button"
          onClick={() => {
            setFilter(title, (parseInt(currentValue) + 1).toString());
          }}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
