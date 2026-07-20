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

export default function SelectCity({
  tours,
}: {
  tours: { id: number; slug: string; title: string }[];
}) {
  const [showList, setShowList] = useState<boolean>(false);

  const { setFilter, searchParams } = useFilters();

  const cityName = searchParams.get(FilterField.city);
  const text = tours.find((tour) => tour.slug === cityName);

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
          ? "Where are you going?"
          : text?.title}
        <ArrowDownIcon />
      </button>

      {showList && (
        <ul className="absolute top-full w-full z-20">
          <li
            key={0}
            className="cursor-pointer py-2.5 px-5 bg-white hover:bg-gray-300"
            onClick={() => {
              setShowList(false);
              setFilter(FilterField.city, "Clear field");
            }}
          >
            <Text as="p" color="black" size="sm">
              Clear field
            </Text>
          </li>
          {tours.map(({ id, slug, title }) => (
            <li
              key={id}
              className="cursor-pointer py-2.5 px-5 bg-white hover:bg-gray-300"
              onClick={() => {
                setShowList(false);
                setFilter(FilterField.city, slug);
              }}
            >
              <Text as="p" color="black" size="sm">
                {title}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
