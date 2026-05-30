import { Text } from "@/components/Text";
import { Decimal } from "../../../../../generated/prisma/internal/prismaNamespace";
import { BookingStatus } from "../../../../../generated/prisma/client";
import BookingHistoryItem from "./BookingHistoryItem";

type BookingHistoryListProps = {
  tourList: {
    id: number;
    totalPrice: Decimal;
    status: BookingStatus;
    tour: {
      title: string;
      imageUrl: string;
      dateOfArrival: Date;
      dateOfDeparture: Date;
    };
  }[];
};

export default function BookingHistoryList({
  tourList,
}: BookingHistoryListProps) {
  return (
    <section className="p-15 bg-[#171717]">
      <Text as="h1" color="white" size="lg" className="uppercase mb-10">
        Booking History
      </Text>

      <ul className="flex flex-col gap-10">
        {tourList.map(({ id, totalPrice, tour, status }) => (
          <BookingHistoryItem
            key={id}
            totalPrice={totalPrice.toString()}
            tour={tour}
            status={status}
          />
        ))}
      </ul>
    </section>
  );
}
