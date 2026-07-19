import { Categories, Prisma } from "../../../generated/prisma/client";
import { TourWhereUniqueInput } from "../../../generated/prisma/models";
import { prisma } from "../prisma";

type TourFilterProps = {
  city?: string;
  dates?: string;
  adults?: string;
  children?: string;
  rooms?: string;
  rating?: string;
  category?: string;
  sort?: string;
  price?: string;
};

export const dbFindTour = async (filter: TourWhereUniqueInput) => {
  return prisma.tour.findUnique({
    where: filter,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      imageUrl: true,
      category: true,
      propertyType: true,
      toursType: true,
      price: true,
      route: true,
      food: true,
      departures: true,
    },
  });
};

export const dbFindPopularTours = async () => {
  return prisma.tour.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      imageUrl: true,
      price: true,
    },
  });
};

export const dbFindFilteredTours = async (filter: TourFilterProps) => {
  const where: Prisma.TourWhereInput = {};
  const orderBy: Prisma.TourOrderByWithRelationInput = {};

  if (filter.rating) {
    where.rating = {
      gte: Number(filter.rating),
    };
  }

  if (filter.category?.trim()) {
    const categories = filter.category
      .split(",")
      .filter((category): category is Categories =>
        Object.values(Categories).includes(category as Categories),
      );

    if (categories.length) {
      where.category = {
        in: categories,
      };
    }
  }

  if (filter.dates) {
    const [from, to] = filter.dates.split("_");
    where.AND = [
      {
        dateOfArrival: {
          lte: new Date(to),
        },
      },
      {
        dateOfDeparture: {
          gte: new Date(from),
        },
      },
    ];
  }

  if (filter.price) {
    const [min, max] = filter.price.split("_");
    where.price = {
      gte: Number(min),
      lte: Number(max),
    };
  }

  if (!filter.sort || filter.sort === "default") {
    orderBy.id = "asc";
  } else if (filter.sort === "price: Low to High") {
    orderBy.price = "asc";
  } else if (filter.sort === "price: High to Low") {
    orderBy.price = "desc";
  } else if (filter.sort === "rating") {
    orderBy.rating = "asc";
  } else if (filter.sort === "popularity") {
    orderBy.rating = "desc";
  }
  // console.log("where", where);
  return prisma.tour.findMany({
    where,
    orderBy,
  });
};
