import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { Text } from "@/components/Text";
import { useClickOutside } from "@/hooks/useClickOutside";
import  { useRef, useState } from "react";

const arrivalTimeData = [
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
];

export default function BookingFormArrivalTime() {
  const [showList, setShowList] = useState(false);
  const [arrivalTime, setArrivalTime] = useState("13:00 - 14:00");

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowList(false));
  return (
    <div className="flex flex-col gap-7.5">
      <Text as="p" color="white" size="md">
        Your arrival time
      </Text>
      <Text as="p" color="white60" size="sm">
        Your room will be ready for arrival at 15:00. 24-hour reception - you
        will be helped at any time!
      </Text>

      <div ref={containerRef} className="relative flex w-50">
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
            {!arrivalTime || arrivalTime === "Clear field"
              ? "Where are you going?"
              : arrivalTime}
            <ArrowDownIcon />
          </Text>
        </button>

        {showList && (
          <ul className="absolute top-full w-full z-20">
            {arrivalTimeData.map((item) => (
              <li
                key={item}
                className="cursor-pointer py-2.5 px-5 bg-white hover:bg-gray-300"
                onClick={() => {
                  setShowList(false);
                  setArrivalTime(item);
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
    </div>
  );
}
