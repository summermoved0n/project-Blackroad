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
  // console.log("booking history", userBookingHistory);

  const findReview = await dbFindReview({ authorId: userId });
  // console.log("find review", findReview);

  return (
    <main className="text-white">
      <BookingHistoryList
        userId={userId}
        userReviews={findReview}
        bookingHistoryList={userBookingHistory}
      />
    </main>
  );
}
