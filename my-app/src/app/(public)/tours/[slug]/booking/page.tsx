import BookingPathNames from "./BookingPathNames";
import BookingInfo from "./BookingInfo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";
import { dbGetUser } from "@/lib/repositories/auth.repo";
import { dbFindTour } from "@/lib/repositories/tour.repo";
import BookingStripeForm from "./BookingStripeForm";
import BookingNotFound from "./BookingNotFound";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  // console.log("slug", slug);

  const getTourById = await dbFindTour({ slug });
  // console.log("getTourById", getTourById);
  const userId = await getCurrentUser();
  const user = await dbGetUser({ id: userId! });

  if (!getTourById || !user) {
    return <BookingNotFound />;
  }

  return (
    <main className="pt-17 md:pt-20 bg-primary">
      <div className="bg-secondary md:px-20 pt-4 md:pt-5 pb-12.5 md:pb-37.5">
        <BookingPathNames title={getTourById.title} />
        <div className="grid md:grid-cols-[2fr_3fr] gap-7.5">
          <BookingInfo tour={getTourById} />
          <BookingStripeForm user={user} tourId={getTourById.id} />
        </div>
      </div>
    </main>
  );
}
