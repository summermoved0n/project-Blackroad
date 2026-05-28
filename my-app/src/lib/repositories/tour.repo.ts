import { TourWhereUniqueInput } from "../../../generated/prisma/models";
import { prisma } from "../prisma";

export const dbFindTour = async (filter: TourWhereUniqueInput) => {
  return prisma.tour.findUnique({
    where: filter,
  });
};
