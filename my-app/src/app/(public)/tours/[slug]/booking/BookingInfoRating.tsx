import { ParkingIcon } from "@/components/icons/ParkingIcon";
import { WiFiIcon } from "@/components/icons/WiFiIcon";
import ReviewStars from "@/components/ReviewStars";
import { Text } from "@/components/Text";
import { capitalizeFirstLetter } from "@/lib/utility/helpers";

type TourProps = {
  tour: {
    title: string;
    category: string;
    rating: number;
  };
};

export default function BookingInfoRating({ tour }: TourProps) {
  const { rating, title, category } = tour;

  return (
    <div className="bg-primary px-4 py-7.5 lg:py-15 lg:px-15 flex flex-col gap-7.5">
      <div className="flex justify-between">
        <ReviewStars stars={rating} />
        <Text as="p" color="white" size="sm">
          {rating}
        </Text>
      </div>

      <Text as="h2" color="white" size="md">
        {title}
      </Text>

      <Text as="p" color="white60" size="sm">
        {capitalizeFirstLetter(category)}
      </Text>

      <div className="flex justify-between">
        <Text as="p" color="white60" size="sm" className="flex gap-2">
          <WiFiIcon />
          Free Wi-Fi
        </Text>
        <Text as="p" color="white60" size="sm" className="flex gap-2">
          <ParkingIcon />
          Parking lot
        </Text>
      </div>
    </div>
  );
}
