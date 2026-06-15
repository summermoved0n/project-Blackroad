import ToursListItem from "@/app/(public)/tours/ToursListItem";
import { Text } from "@/components/Text";
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
    <div>
      <Text as="p" color="white" size="lg" className="mt-15 mb-12.5">
        Favorite
      </Text>

      <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-7.5">
        {favoriteToursList && favoriteToursList?.length > 0 ? (
          favoriteToursList?.map(({ tour }) => (
            <ToursListItem
              key={tour.id}
              itemData={tour}
              favoriteToursList={favoriteToursList}
            />
          ))
        ) : (
          <Text as="p" color="white60" size="md">
            You don`t have any favorite tours yet
          </Text>
        )}
      </ul>
    </div>
  );
}
