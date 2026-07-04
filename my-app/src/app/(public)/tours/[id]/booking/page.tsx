import BookingPathNames from "./BookingPathNames";
import BookingInfo from "./BookingInfo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";
import { dbGetUser } from "@/lib/repositories/auth.repo";
import { dbFindTour } from "@/lib/repositories/tour.repo";
import BookingStripeForm from "./BookingStripeForm";

type PageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const getTourById = await dbFindTour({ id: Number(id) });
  const userId = await getCurrentUser();
  const user = await dbGetUser({ id: userId! });

  return (
    <main className="pt-17 md:pt-20 bg-primary">
      <div className="bg-secondary md:px-20 pt-4 md:pt-5 pb-12.5 md:pb-37.5">
        <BookingPathNames title={getTourById!.title} />
        <div className="grid md:grid-cols-[2fr_3fr] gap-7.5">
          <BookingInfo tour={getTourById} />
          <BookingStripeForm user={user!} />
        </div>
      </div>
    </main>
  );
}
