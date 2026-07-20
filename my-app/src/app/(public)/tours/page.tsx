import ToursSearchForm from "./ToursSearchForm";
import ToursHero from "./ToursHero";
import { dbFindFilteredTours } from "@/lib/repositories/tour.repo";
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
  const toursList = await dbFindFilteredTours(params);
  console.log("toursList", toursList);

  return (
    <main>
      <ToursHero />
      <ToursSearchForm
        toursListData={toursList}
        favoriteToursList={favoriteToursList}
      />
    </main>
  );
}
