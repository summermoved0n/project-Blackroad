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
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const userId = await getCurrentUser();
  const getTourById = await dbFindTour({ slug });

  let favoriteToursList = null;

  if (userId) {
    const data = await dbFindFavorteTours({ userId });
    favoriteToursList = data;
  }


  const tourReviews = await dbFindReview({ tourId: getTourById?.id });

  return (
    <Suspense fallback={null}>
      <TourDetails
        tourData={getTourById}
        tourReviews={tourReviews}
        favoriteToursList={favoriteToursList}
      />
    </Suspense>
  );
}
