import { prisma } from "@/lib/prisma";
import { DepartureStatus, Prisma } from "../generated/prisma/browser";

const commonRoute = [
  "Verkhovyna",
  "Vizhnitsa",
  "Kamenetz",
  "Podolsky",
  "Satanov",
  "Chernivtsi",
];

const tours: Prisma.TourCreateInput[] = [
  {
    title: "Dzhurinsky waterfall",
    slug: "dzhurinsky-waterfall",
    description:
      "The most full-flowing plain waterfall of Ukraine, which is considered one of the most picturesque and interesting places of Ternopil region.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815312/blackroad_tours/Travel_with_us_waterfall_iqxo3a.jpg",
    category: "mountains",
    propertyType: "cottages",
    toursType: "individual",
    route: commonRoute,
    food: "Breakfasts",
    price: 5000,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },

  {
    title: "Rest in the canyon",
    slug: "rest-in-the-canyon",
    description:
      "Moving to the picturesque rock canyon in the village of Buki. Excursion in the form of an easy walk, during which you will see what a large-scale natural event took place here.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815313/blackroad_tours/Travel_with_us_canyon_goukbs.jpg",
    category: "mountains",
    propertyType: "hotels",
    toursType: "individual",
    route: commonRoute,
    food: "Breakfasts",
    price: 3000,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },

  {
    title: "Blue lakes and ancient Lubech",
    slug: "blue-lakes-and-ancient-lubech",
    description:
      "Excursion to Lubech, once a Viking trading post, or to the city of the future Slavutich. Swimming in the cleanest lakes with water of incredible color.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815307/blackroad_tours/Popular_tours_lake_tdtotq.jpg",
    category: "lakes",
    propertyType: "hotels",
    toursType: "group",
    route: commonRoute,
    food: "Breakfasts",
    price: 3300,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },

  {
    title: "Autumn in the mountains",
    slug: "autumn-in-the-mountains",
    description:
      "Walking in the crowns of trees and watching bears. Rest in a mountain hotel and meeting dawn in the mountains.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815308/blackroad_tours/Popular_tours_mountains_hhwa8z.jpg",
    category: "mountains",
    propertyType: "chalet",
    toursType: "group",
    route: commonRoute,
    food: "Breakfasts",
    price: 6200,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },

  {
    title: "Unusual Rivne region",
    slug: "unusual-rivne-region",
    description:
      "A journey in which we combined unique historical projects and locations! Riding on ancient boats in the park of historical reconstruction of boatbuilding.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900865/blackroad_tours/5_1_neomf4.jpg",
    category: "lakes",
    propertyType: "chalet",
    toursType: "individual",
    route: commonRoute,
    food: "Breakfasts",
    price: 3500,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },

  {
    title: "Secrets of Podolia and Gaidamak Yar",
    slug: "secrets-of-podolia-and-gaidamak-yar",
    description:
      "Rare and very beautiful tour. Unknown to tourists Podolsk land. One of the oldest rock monasteries. Mysterious Gaydamak ravine with bizarre rocks and petrified creatures.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900867/blackroad_tours/kseniia-rastvorova-VoHG1dLjTpo-unsplash_1_gt98fl.jpg",
    category: "mountains",
    propertyType: "cottages",
    toursType: "individual",
    route: commonRoute,
    food: "Breakfasts",
    price: 4500,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },

  {
    title: "Buchak - a place of power",
    slug: "buchak-a-place-of-power",
    description:
      "A unique place of power is Lake Buchak, which may soon disappear. Hurry to see! The opportunity to swim in Lake Buchak.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900866/blackroad_tours/Ozero-Buchak-s_1_cv6xhw.jpg",
    category: "lakes",
    propertyType: "cottages",
    toursType: "group",
    route: commonRoute,
    food: "Breakfasts",
    price: 2700,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },

  {
    title: "Franco-tour: nature and other masterpieces of Galicia",
    slug: "franco-tour-nature-and-other-masterpieces-of-galicia",
    description:
      "Visit the incredible pharmacy-museum of the inventor of the oil industry Johann Zeg. You will see an ancient rock monastery and the only Greek Catholic Lavra.",
    imageUrl:
      "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900865/blackroad_tours/unsplash_4nAh6u7dD1g_ohi8lc.jpg",
    category: "lakes",
    propertyType: "hotels",
    toursType: "group",
    route: commonRoute,
    food: "Breakfasts",
    price: 6250,

    departures: {
      create: [
        {
          startDate: new Date("2026-10-19T00:00:00.000Z"),
          endDate: new Date("2026-10-23T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
        {
          startDate: new Date("2026-11-09T00:00:00.000Z"),
          endDate: new Date("2026-11-13T00:00:00.000Z"),
          status: DepartureStatus.available,
          departureCity: "Toronto",
        },
      ],
    },
  },
];

async function main() {
  for (const tour of tours) {
    await prisma.tour.create({
      data: tour,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
