import { Text } from "@/components/Text";
import BookingHistoryItem from "./BookingHistoryItem";
import {
  TourListHistoryPayload,
  UserReviewPayload,
} from "@/types/profile.types";
import Link from "next/link";

type BookingHistoryListProps = {
  bookingHistoryList: TourListHistoryPayload[];
  userReviews: UserReviewPayload[];
};

export default function BookingHistoryList({
  userReviews,
  bookingHistoryList,
}: BookingHistoryListProps) {
  return (
    <section className="p-5 md:p-15 bg-primary">
      <Text as="h1" color="white" size="lg" className="uppercase mb-10">
        Booking History
      </Text>

      {bookingHistoryList?.length === 0 ? (
        <div>
          <Text as="p" color="white60" size="sm" className="mb-7.5">
            No reservations yet.
          </Text>

          <Link
            className="w-50 h-12.5 flex justify-center items-center border text-white border-accent hover:bg-accent transition"
            href="/tours"
          >
            <Text as="p" color="white" size="sm">
              Book
            </Text>
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-10">
          {bookingHistoryList.map(
            ({ id, totalPrice, tour, departure, status, user }) => (
              <BookingHistoryItem
                key={id}
                userId={user.id}
                bookingId={id}
                userReviews={userReviews}
                totalPrice={totalPrice.toString()}
                tour={tour}
                departure={departure}
                status={status}
              />
            ),
          )}
        </ul>
      )}
    </section>
  );
}
