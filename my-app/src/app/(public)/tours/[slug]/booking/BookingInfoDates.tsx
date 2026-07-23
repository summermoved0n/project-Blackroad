import { Text } from "@/components/Text";
import { calculateNights } from "@/lib/utility/helpers";

type TourProps = {
  departureDates:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
  capasityData: {
    adults: string | null;
    children: string | null;
    rooms: string | null;
  };
};

export default function BookingInfoDates({
  departureDates,
  capasityData,
}: TourProps) {
  if (
    !departureDates ||
    !capasityData.adults ||
    !capasityData.children ||
    !capasityData.rooms
  ) {
    return (
      <Text
        as="p"
        color="white"
        size="md"
        className="bg-primary py-7.5 px-4 lg:py-15 lg:px-15"
      >
        Something went wrong
      </Text>
    );
  }

  const { startDate, endDate } = departureDates;
  const { adults, children, rooms } = capasityData;

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
            {new Date(startDate).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </div>

        <div className="flex flex-col gap-3 ml-auto md:ml-0 xl:ml-auto">
          <Text as="p" color="white60" size="sm">
            Date of departure
          </Text>
          <Text as="p" color="white" size="sm">
            {departureDates
              ? new Date(endDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Wrong data"}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Text as="p" color="white60" size="sm">
          Total stay:
        </Text>
        <Text as="p" color="white" size="sm">
          {calculateNights(startDate, endDate)} nights
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
