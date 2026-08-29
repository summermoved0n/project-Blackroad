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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const userId = await getCurrentUser();
  let favoriteToursList = null;

  if (userId) {
    const data = await dbFindFavorteTours({ userId });
    favoriteToursList = data;
  }

  const params = await searchParams;
  const allToursList = await dbFindPopularTours();
  const filteredToursList = await dbFindFilteredTours(params);

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
