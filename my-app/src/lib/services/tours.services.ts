import { dbGetAllTours } from "../repositories/tours.repo";

export const getAllTours = async () => {
  await dbGetAllTours();
};
