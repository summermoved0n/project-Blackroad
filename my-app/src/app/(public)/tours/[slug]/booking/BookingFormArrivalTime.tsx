import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { Text } from "@/components/Text";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SetStateAction, useRef, useState } from "react";

const arrivalTimeData = [
  "Clear field",
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

export default function BookingFormArrivalTime({
  arrivalTime,
  setArrivalTime,
}: {
  arrivalTime: string;
  setArrivalTime: React.Dispatch<SetStateAction<string>>;
}) {
  const [showList, setShowList] = useState<boolean>(false);

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

      <div ref={containerRef} className="relative flex flex-col md:w-50">
        <Text as="p" color="white" size="sm">
          Select arrival time
        </Text>
        <button
          type="button"
          className="w-full group"
          onClick={() => {
            setShowList(!showList);
          }}
        >
          <Text
            as="p"
            color="white60"
            size="sm"
            className="flex items-center justify-between py-3 md:py-5 border-b border-white/70 group-hover:border-accent group-focus:border-accent transition"
          >
            {!arrivalTime || arrivalTime === "Clear field"
              ? "Default time"
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
                  if (item === "Clear field") {
                    return setArrivalTime("");
                  }
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
