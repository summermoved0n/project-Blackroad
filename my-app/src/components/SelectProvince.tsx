"use client";

import { useRef, useState } from "react";
import { Text } from "./Text";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useFilters } from "@/hooks/useFilters";
import { FilterField } from "@/types/filter.types";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";

export default function SelectProvince({
  tours,
}: {
  tours: { id: number; province: string }[];
}) {
  const [showList, setShowList] = useState<boolean>(false);

  const { setFilter, searchParams } = useFilters();

  const cityName = searchParams.get(FilterField.province);
  const title = tours.find((item) => item.province === cityName);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowList(false));

  return (
    <div ref={containerRef} className="relative flex my-5">
      <button
        type="button"
        className="w-full flex items-center justify-between py-5 border-b border-white/10 text-white hover:border-accent focus:border-accent transition"
        onClick={() => {
          setShowList(!showList);
        }}
      >
        {!cityName || cityName === "Clear field"
          ? "What province are you going?"
          : title?.province
            ? capitalizeFirstLetter(title.province).replaceAll("_", " ")
            : ""}
        <ArrowDownIcon />
      </button>

      {showList && (
        <ul className="absolute top-full w-full z-10">
          <li
            key={0}
            className="cursor-pointer py-2.5 px-5 bg-white hover:bg-gray-300"
            onClick={() => {
              setShowList(false);
              setFilter(FilterField.province, "Clear field");
            }}
          >
            <Text as="p" color="black" size="sm">
              Clear field
            </Text>
          </li>
          {tours.map(({ id, province }) => (
            <li
              key={id}
              className="cursor-pointer py-2.5 px-5 bg-white hover:bg-gray-300"
              onClick={() => {
                setShowList(false);
                setFilter(FilterField.province, province);
              }}
            >
              <Text as="p" color="black" size="sm">
                {capitalizeFirstLetter(province).replaceAll("_", " ")}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
