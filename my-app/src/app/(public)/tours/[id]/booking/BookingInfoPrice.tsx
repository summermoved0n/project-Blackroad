import { Text } from "@/components/Text";
import { notFound } from "next/navigation";

type TourProps = {
  tour: {
    price: number;
  } | null;
};

export default function BookingInfoPrice({ tour }: TourProps) {
  if (!tour) {
    notFound();
  }
  return (
    <div
      className="bg-primary p-15 flex flex-col gap-7.5"
    >
      <Text as="h2" color="white" size="md">
        Price details
      </Text>

      <div className="flex justify-between items-center">
        <Text as="h2" color="white60" size="sm">
          Total
        </Text>
        <Text as="h2" color="white" size="md">
          {tour.price} CA$
        </Text>
      </div>

      <div className="flex justify-between items-center">
        <Text as="h2" color="white60" size="sm">
          Taxes and fees included
        </Text>
        <Text as="h2" color="white" size="md">
          {tour.price * 0.15} CA$
        </Text>
      </div>
    </div>
  );
}
