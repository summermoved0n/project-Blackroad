import { prisma } from "../prisma";

export const dbGetAllTours = async () => {
  return prisma.tour.findMany();
};

export const dbGetTourById = async () => {
  return prisma.tour.findMany();
};
