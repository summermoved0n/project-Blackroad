"use client";

import { Text } from "@/components/Text";
import { useFilters } from "@/hooks/useFilters";
import { calculateNights } from "@/lib/utility/helpers";
import { FilterField } from "@/types/filter.types";

type TourProps = {
  tour: {
    title: string;
    departures: {
      id: number;
      startDate: Date;
      endDate: Date;
    }[];
  };
};

export default function BookingInfoDates({ tour }: TourProps) {
  const { title, departures } = tour;
  const { searchParams } = useFilters();

  const adults = searchParams.get(FilterField.adults) || "2";
  const children = searchParams.get(FilterField.children) || "0";
  const rooms = searchParams.get(FilterField.rooms) || "1";

  const departureDateId = searchParams.get("departureDates");
  const departureDates = departures.find(
    (item) => item.id === Number(departureDateId),
  );
  console.log(departureDates);

  return (
    <div className="bg-primary py-7.5 px-4 lg:py-15 lg:px-15 flex flex-col gap-10">
      <Text as="p" color="white" size="md">
        Your booking information
      </Text>

      <div className="grid grid-cols-2 md:grid-cols-1 md:gap-10 xl:grid-cols-2 xl:gap-0">
        <div className="flex flex-col gap-3 border-r border-r-white/10 md:border-r-0 xl:border-r">
          <Text as="p" color="white60" size="sm">
            Date of arrival
          </Text>
          <Text as="p" color="white" size="sm">
            {departureDates
              ? new Date(departureDates?.startDate).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                )
              : "Please back to prev page to pick the tour date"}
          </Text>
        </div>

        <div className="flex flex-col gap-3 ml-auto md:ml-0 xl:ml-auto">
          <Text as="p" color="white60" size="sm">
            Date of departure
          </Text>
          <Text as="p" color="white" size="sm">
            {departureDates
              ? new Date(departureDates?.endDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Please back to prev page to pick the tour date"}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Text as="p" color="white60" size="sm">
          Total stay:
        </Text>
        <Text as="p" color="white" size="sm">
          {calculateNights(departures[0].startDate, departures[0].endDate)}{" "}
          nights
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <Text as="p" color="white60" size="sm">
          You have chosen:
        </Text>
        <Text as="p" color="white" size="sm">
          Tour for {adults} adults and {children}{" "}
          {Number(children) > 1 ? "children" : "child"}
        </Text>
        <Text as="p" color="white" size="sm">
          Total {rooms} {Number(rooms) > 1 ? "rooms" : "room"}
        </Text>
      </div>
    </div>
  );
}
