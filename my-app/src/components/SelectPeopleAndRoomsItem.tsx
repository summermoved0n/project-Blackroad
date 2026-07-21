import { useFilters } from "@/hooks/useFilters";
import { Text } from "./Text";
import { MinusIcon } from "@/components/icons/MinusIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";
import { FilterField } from "@/types/filter.types";

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
          className="h-full w-full transition hover:text-accent focus:text-accent"
          type="button"
          onClick={() => {
            setFilter(title, (parseInt(currentValue) - 1).toString());
          }}
          disabled={
            title === FilterField.adults || title === FilterField.rooms
              ? currentValue === "1"
              : currentValue === "0"
          }
        >
          <MinusIcon />
        </button>
        <Text as="p" color="black" size="sm">
          {currentValue}
        </Text>
        <button
          className="h-full w-full transition hover:text-accent focus:text-accent"
          type="button"
          onClick={() => {
            setFilter(title, (parseInt(currentValue) + 1).toString());
          }}
          disabled={
            title === FilterField.adults ||
            title === FilterField.rooms ||
            title === FilterField.children
              ? currentValue === "10"
              : currentValue === "0"
          }
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
