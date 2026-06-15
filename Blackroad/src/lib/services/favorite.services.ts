import { dbFindUser } from "../repositories/auth.repo";
import {
  dbCreateFavorteTour,
  dbDeleteFavorteTours,
} from "../repositories/profile.repo";
import { getCurrentUser } from "../utility/getCurrentUser";

export const createFavoriteTour = async ({ tourId }: { tourId: number }) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("Please sign up or log in first to add tour to favorite");
  }

  const user = await dbFindUser({ id: userId });

  if (!user) {
    throw new Error("Wrong user Id or can't find this user");
  }

  await dbCreateFavorteTour({ userId: user.id, tourId });
};

export const deleteFavoriteTour = async ({
  favoriteId,
}: {
  favoriteId: number;
}) => {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("Please sign up or log in first to add tour to favorite");
  }

  const user = await dbFindUser({ id: userId });

  if (!user) {
    throw new Error("Wrong user Id or can't find this user");
  }

  await dbDeleteFavorteTours({ id: favoriteId });
};
