import { Text } from "@/components/Text";
import BookingHistoryItem from "./BookingHistoryItem";
import {
  TourListHistoryPayload,
  UserReviewPayload,
} from "@/types/profile.types";
import Link from "next/link";

type BookingHistoryListProps = {
  userId: number;
  bookingHistoryList: TourListHistoryPayload[];
  userReviews: UserReviewPayload[];
};

export default function BookingHistoryList({
  userReviews,
  userId,
  bookingHistoryList,
}: BookingHistoryListProps) {
  return (
    <section
      className="p-15 bg-primary
"
    >
      <Text as="h1" color="white" size="lg" className="uppercase mb-10">
        Booking History
      </Text>

      {bookingHistoryList?.length === 0 ? (
        <div>
          <Text as="p" color="white60" size="sm" className="mb-7.5">
            No reservations yet.
          </Text>

          <Link
            className="w-50 h-12.5 flex justify-center items-center border border-[#ea9c3f] hover:bg-accent
 transition"
            href="/tours"
          >
            Book
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-10">
          {bookingHistoryList.map(({ id, totalPrice, tour, status }) => (
            <BookingHistoryItem
              key={id}
              userId={userId}
              bookingId={id}
              userReviews={userReviews}
              totalPrice={totalPrice.toString()}
              tour={tour}
              status={status}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
