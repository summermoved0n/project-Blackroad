import { dbFindFavorteTours } from "@/lib/repositories/profile.repo";
import { getCurrentUser } from "@/lib/utility/getCurrentUser";

export default async function page() {
  const userId = await getCurrentUser();
  let favoriteToursList = null;

  if (userId) {
    const data = await dbFindFavorteTours({ userId });
    favoriteToursList = data;
  }

  console.log(favoriteToursList);

  return (
    <div className="text-white">
      {favoriteToursList && favoriteToursList?.length > 0 ? (
        favoriteToursList?.map(({ tour }) => (
          <p key={tour.id} className="text-white">
            {tour.title}
          </p>
        ))
      ) : (
        <p className="text-white">NOt yet</p>
      )}
    </div>
  );
}
