import ToursSearchForm from "./ToursSearchForm";
import ToursHero from "./ToursHero";
import {
  dbFindFilteredTours,
  dbFindPopularTours,
} from "@/lib/repositories/tour.repo";
import { dbFindFavorteTours } from "@/lib/repositories/profile.repo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    dates?: string;
    rating?: string;
    price?: string;
    sort?: string;
    category?: string;
  }>;
}) {
  const userId = await getCurrentUser();
  let favoriteToursList = null;

  if (userId) {
    const data = await dbFindFavorteTours({ userId });
    favoriteToursList = data;
  }

  const params = await searchParams;
  // console.log(params);
  const allToursList = await dbFindPopularTours();
  const filteredToursList = await dbFindFilteredTours(params);
  // console.log("toursList", toursList);

  return (
    <main>
      <ToursHero />
      <ToursSearchForm
        allToursList={allToursList}
        filteredToursList={filteredToursList}
        favoriteToursList={favoriteToursList}
      />
    </main>
  );
}
