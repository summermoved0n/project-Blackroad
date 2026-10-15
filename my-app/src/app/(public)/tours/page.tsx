import ToursSearchForm from "./ToursSearchForm";
import ToursHero from "./ToursHero";
import {
  dbFindFilteredTours,
  dbFindPopularTours,
} from "@/lib/repositories/tour.repo";
import { dbFindFavorteTours } from "@/lib/repositories/profile.repo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";
import { Categories, Province } from "../../../../generated/prisma/enums";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    province?: Province;
    dates?: string;
    rating?: string;
    price?: string;
    sort?: string;
    category?: Categories;
    adults?: string;
    children?: string;
  }>;
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
