import { Text } from "@/components/Text";
import { calculateTotalPrice } from "@/lib/utility/helpers";

type BookingPriceProps = {
  price: number;
  capasityData: {
    adults: string | null;
    children: string | null;
    rooms: string | null;
  };
  roomType: string | null;
};

export default function BookingInfoPrice({
  price,
  roomType,
  capasityData,
}: BookingPriceProps) {
  if (
    !price ||
    !roomType ||
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

  const { adults, children, rooms } = capasityData;
  const fullPrice = calculateTotalPrice(
    price,
    adults,
    children,
    rooms,
    roomType,
  );

  return (
    <div className="bg-primary py-7.5 px-4 lg:py-15 lg:px-15 flex flex-col gap-7.5">
      <Text as="h2" color="white" size="md">
        Price details
      </Text>

      <div className="flex justify-between items-center">
        <Text as="h2" color="white60" size="sm">
          Total
        </Text>
        <Text as="h2" color="white" size="md">
          {fullPrice.totalPrice} CA$
        </Text>
      </div>

      <div className="flex justify-between items-center">
        <Text as="h2" color="white60" size="sm">
          Taxes and fees included
        </Text>
        <Text as="h2" color="white" size="md">
          {fullPrice.taxPrice} CA$
        </Text>
      </div>
    </div>
  );
}
