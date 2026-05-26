"use client";

import { useRef, useState } from "react";
import { Text } from "./Text";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { useClickOutside } from "@/hooks/useClickOutside";

const citiesList = [
  "Oshawa",
  "Ajax",
  "Whitby",
  "Toronto",
  "Pickering",
  "Brampton",
  "Clear field",
];

export default function SelectCity() {
  const [showList, setShowList] = useState(false);
  const [cityName, setCityName] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowList(false));

  return (
    <div ref={containerRef} className="relative flex">
      <button
        type="button"
        className="w-full"
        onClick={() => {
          setShowList(!showList);
        }}
      >
        <Text
          as="p"
          color="white"
          size="sm"
          className="flex items-center justify-between py-5 md:py-0 md:pb-2.5 border-b-1 border-white/10"
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
                setCityName(item);
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
