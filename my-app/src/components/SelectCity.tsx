"use client";

import { useRef, useState } from "react";
import { Text } from "./Text";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useFilters } from "@/hooks/useFilters";
import { FilterField } from "@/types/filter.types";

const citiesList = [
  "Clear field",
  "Oshawa",
  "Ajax",
  "Whitby",
  "Toronto",
  "Pickering",
  "Brampton",
];

export default function SelectCity() {
  const [showList, setShowList] = useState<boolean>(false);

  const { setFilter, searchParams } = useFilters();

  const cityName = searchParams.get(FilterField.city);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowList(false));

  return (
    <div ref={containerRef} className="relative flex">
      <button
        type="button"
        className="w-full flex items-end pb-5"
        onClick={() => {
          setShowList(!showList);
        }}
      >
        <Text
          as="p"
          color="white"
          size="sm"
          className="w-full flex items-center justify-between py-5 md:py-2 border-b border-white/10 hover:border-accent transition"
        >
          {!cityName || cityName === "Clear field"
            ? "Where are you going?"
            : cityName}
          <ArrowDownIcon />
        </Text>
      </button>

      {showList && (
        <ul className="absolute top-full w-full z-20">
          {citiesList.map((item) => (
            <li
              key={item}
              className="cursor-pointer py-2.5 px-5 bg-white hover:bg-gray-300"
              onClick={() => {
                setShowList(false);
                setFilter(FilterField.city, item);
              }}
            >
              <Text as="p" color="black" size="sm">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
