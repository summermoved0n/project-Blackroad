import { useState } from "react";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useFilters } from "@/hooks/useFilters";
import { FilterField } from "@/types/filter.types";

type ToursTableProps = {
  slug: string;
  tourDate: {
    id: number;
    tourId: number;
    startDate: Date;
    endDate: Date;
    departureCity: string;
    status: string;
  };
};

export default function ToursTableItem({ slug, tourDate }: ToursTableProps) {
  const router = useRouter();
  const { searchParams } = useFilters();

  const adults = searchParams.get(FilterField.adults) || "2";
  const children = searchParams.get(FilterField.children) || "0";
  const rooms = searchParams.get(FilterField.rooms) || "1";

  const { id, startDate, endDate, departureCity } = tourDate;
  const [selectedRoom, setSelectedRoom] = useState("single");

  return (
    <tr className="border-y border-white/20">
      <td className="py-5">
        <Text as="p" color="white60" size="sm">
          {new Date(startDate).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </Text>
        <Text as="p" color="white" size="md">
          {new Date(startDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
        <Text as="p" color="white60" size="sm">
          Departure from <span className="text-accent/60">{departureCity}</span>
        </Text>
      </td>
      <td className="py-5">
        <Text as="p" color="white60" size="sm">
          {new Date(endDate).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </Text>
        <Text as="p" color="white" size="md">
          {new Date(endDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
        <Text as="p" color="white60" size="sm">
          Return to <span className="text-accent/60">{departureCity}</span>
        </Text>
      </td>
      <td className="py-5">
        <button
          type="button"
          className={clsx(
            "h-12.5 w-30 border border-transparent transition focus:border-white",
            selectedRoom === "single" && "bg-accent",
          )}
          onClick={() => setSelectedRoom("single")}
        >
          <span
            className={
              selectedRoom === "single" ? "text-white" : "text-white/50"
            }
          >
            Single
          </span>
        </button>
        <button
          type="button"
          className={clsx(
            "h-12.5 w-30 border border-transparent transition focus:border-white",
            selectedRoom === "double" && "bg-accent",
          )}
          onClick={() => setSelectedRoom("double")}
        >
          <span
            className={
              selectedRoom === "double" ? "text-white" : "text-white/50"
            }
          >
            Double
          </span>
        </button>
      </td>
      <td className="py-5 text-white">
        {(selectedRoom === "single" && 500) ||
          (selectedRoom === "double" && 600)}{" "}
        CA$
      </td>
      <td className="text-right py-5">
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            router.push(
              `${slug}/booking?departureDates=${id}&roomType=${selectedRoom}&adults=${adults}&children=${children}&rooms=${rooms}`,
            )
          }
        >
          Book now
        </Button>
      </td>
    </tr>
  );
}
