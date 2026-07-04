import { Text } from "@/components/Text";
import { calculateNights } from "@/lib/utility/helpers";
import { notFound } from "next/navigation";

type TourProps = {
  tour: {
    title: string;
    dateOfArrival: Date;
    dateOfDeparture: Date;
  };
};

export default function BookingInfoDates({ tour }: TourProps) {
  const { title, dateOfArrival, dateOfDeparture } = tour;
  return (
    <div className="bg-primary py-7.5 px-4 md:py-15 md:px-15 flex flex-col gap-10">
      <Text as="p" color="white" size="md">
        Your booking information
      </Text>

      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-3 border-r border-r-white/10">
          <Text as="p" color="white60" size="sm">
            Date of arrival
          </Text>
          <Text as="p" color="white" size="sm">
            {new Date(dateOfArrival).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </div>

        <div className="flex flex-col gap-3 ml-auto">
          <Text as="p" color="white60" size="sm">
            Date of departure
          </Text>
          <Text as="p" color="white" size="sm">
            {new Date(dateOfDeparture).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Text as="p" color="white60" size="sm">
          Total stay:
        </Text>
        <Text as="p" color="white" size="sm">
          {calculateNights(dateOfArrival, dateOfDeparture)} nights
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <Text as="p" color="white60" size="sm">
          You have chosen:
        </Text>
        <Text as="p" color="white" size="sm">
          Tour for 2 adults
        </Text>
        <Text as="p" color="white" size="sm">
          {title}
        </Text>
      </div>
    </div>
  );
}
