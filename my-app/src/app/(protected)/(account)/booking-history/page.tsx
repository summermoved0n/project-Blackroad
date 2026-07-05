import { dbFindAllUserBookings } from "@/lib/repositories/booking.repo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";
import BookingHistoryList from "./BookingHistoryList";
import { dbFindReview } from "@/lib/repositories/profile.repo";

export default async function page() {
  const userId = await getCurrentUser();

  if (!userId) {
    return <main className="text-white">Unauthorized</main>;
  }

  const userBookingHistory = await dbFindAllUserBookings({ userId });

  const findReview = await dbFindReview({ authorId: userId });

  return (
    <section>
      <BookingHistoryList
        userId={userId}
        userReviews={findReview}
        bookingHistoryList={userBookingHistory}
      />
    </section>
  );
}
