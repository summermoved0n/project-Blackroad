import { dbFindAllUserBookings } from "@/lib/repositories/booking.repo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";
import BookingHistoryList from "./BookingHistoryList";

export default async function page() {
  const userId = await getCurrentUser();

  if (!userId) {
    return <main className="text-white">Unauthorized</main>;
  }

  const userBookingHistory = await dbFindAllUserBookings({ userId });
  console.log(userBookingHistory);

  return (
    <main className="text-white">
      <BookingHistoryList tourList={userBookingHistory} />
    </main>
  );
}
