import { Suspense } from "react";
import TourDetails from "./TourDetails";
import {
  dbFindFavorteTours,
  dbFindReview,
} from "@/lib/repositories/profile.repo";
import { dbFindTour } from "@/lib/repositories/tour.repo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";

type PageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const userId = await getCurrentUser();
  let favoriteToursList = null;

  if (userId) {
    const data = await dbFindFavorteTours({ userId });
    favoriteToursList = data;
  }

  const getTourById = await dbFindTour({ id: Number(id) });

  const tourReviews = await dbFindReview({ tourId: Number(id) });
  // console.log("tourReviews", tourReviews);

  return (
    <Suspense fallback={null}>
      <TourDetails tourData={getTourById} tourReviews={tourReviews} favoriteToursList={favoriteToursList} />
    </Suspense>
  );
}
