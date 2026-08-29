import { prisma } from "@/lib/prisma";
import {
  DepartureStatus,
  Categories,
  PropertyType,
  ToursType,
  Province,
} from "../generated/prisma/browser";
import bcrypt from "bcrypt";

const commonRoute = [
  "Verkhovyna",
  "Vizhnitsa",
  "Kamenetz",
  "Podolsky",
  "Satanov",
  "Chernivtsi",
];

async function main() {
  const password = await bcrypt.hash(process.env.SEED_USER_PASSWORD!, 10);

  const john = await prisma.user.upsert({
    where: {
      email: "john@example.com",
    },
    update: {},
    create: {
      name: "John Smith",
      email: "john@example.com",
      password,
      isVerify: true,
    },
  });

  const anna = await prisma.user.upsert({
    where: {
      email: "anna@example.com",
    },
    update: {},
    create: {
      name: "Anna Brown",
      email: "anna@example.com",
      password,
      isVerify: true,
    },
  });

  const michael = await prisma.user.upsert({
    where: {
      email: "michael@example.com",
    },
    update: {},
    create: {
      name: "Michael Wilson",
      email: "michael@example.com",
      password,
      isVerify: true,
    },
  });

  const toursData = [
    {
      title: "Dzhurinsky waterfall",
      slug: "dzhurinsky-waterfall",
      description:
        "The most full-flowing plain waterfall of Ukraine, which is considered one of the most picturesque and interesting places of Ternopil region.",
      imageUrl:
        "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815312/blackroad_tours/Travel_with_us_waterfall_iqxo3a.jpg",
      category: Categories.mountains,
      province: Province.alberta,
      propertyType: PropertyType.cottages,
      toursType: ToursType.individual,
      route: commonRoute,
      food: "Breakfasts",
      price: 5000,
      rating: 5,
      capacity: 10,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 10,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 10,
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
      category: Categories.mountains,
      province: Province.british_columbia,
      propertyType: PropertyType.hotels,
      toursType: ToursType.individual,
      route: commonRoute,
      food: "Breakfasts",
      price: 3000,
      rating: 4.5,
      capacity: 15,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 15,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 15,
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
      category: Categories.lakes,
      province: Province.manitoba,
      propertyType: PropertyType.hotels,
      toursType: ToursType.group,
      route: commonRoute,
      food: "Breakfasts",
      price: 3300,
      rating: 3.5,
      capacity: 18,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 18,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 18,
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
      category: Categories.mountains,
      province: Province.new_brunswick,
      propertyType: PropertyType.chalet,
      toursType: ToursType.group,
      route: commonRoute,
      food: "Breakfasts",
      price: 6200,
      rating: 4.7,
      capacity: 12,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 12,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 12,
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
      category: Categories.lakes,
      province: Province.newfoundland_and_labrador,
      propertyType: PropertyType.chalet,
      toursType: ToursType.individual,
      route: commonRoute,
      food: "Breakfasts",
      price: 3500,
      rating: 3.9,
      capacity: 22,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 22,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 22,
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
      category: Categories.mountains,
      province: Province.nova_scotia,
      propertyType: PropertyType.cottages,
      toursType: ToursType.individual,
      route: commonRoute,
      food: "Breakfasts",
      price: 4500,
      rating: 4.3,
      capacity: 25,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 25,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 25,
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
      category: Categories.lakes,
      province: Province.ontario,
      propertyType: PropertyType.cottages,
      toursType: ToursType.group,
      route: commonRoute,
      food: "Breakfasts",
      price: 2700,
      rating: 4.8,
      capacity: 23,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 23,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 23,
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
      category: Categories.lakes,
      province: Province.quebec,
      propertyType: PropertyType.cottages,
      toursType: ToursType.group,
      route: commonRoute,
      food: "Breakfasts",
      price: 6250,
      rating: 4.4,
      capacity: 31,

      departures: {
        create: [
          {
            startDate: new Date("2026-10-19T00:00:00.000Z"),
            endDate: new Date("2026-10-23T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 31,
          },
          {
            startDate: new Date("2026-11-09T00:00:00.000Z"),
            endDate: new Date("2026-11-13T00:00:00.000Z"),
            status: DepartureStatus.available,
            departureCity: "Toronto",
            availableSeats: 31,
          },
        ],
      },
    },
  ];

  const tours = await Promise.all(
    toursData.map((tour) =>
      prisma.tour.create({
        data: tour,
      }),
    ),
  );

  const reviewsByTour = [
    [
      {
        authorId: john.id,
        rating: 5,
        comment:
          "Amazing scenery and excellent organization from start to finish.",
      },
      {
        authorId: anna.id,
        rating: 4,
        comment: "A memorable trip with a friendly and knowledgeable guide.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment:
          "The tour was enjoyable, although the schedule felt a little rushed.",
      },
    ],
    [
      {
        authorId: john.id,
        rating: 4,
        comment: "Beautiful location and a well-planned itinerary.",
      },
      {
        authorId: anna.id,
        rating: 5,
        comment: "One of the best tours I have taken. Highly recommended.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment:
          "A good experience, but transportation could have been more comfortable.",
      },
    ],
    [
      {
        authorId: john.id,
        rating: 5,
        comment:
          "The lakes were stunning and the entire day was perfectly organized.",
      },
      {
        authorId: anna.id,
        rating: 4,
        comment: "A relaxing and interesting tour with many beautiful views.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment:
          "Nice places to visit, but I expected more time at each location.",
      },
    ],
    [
      {
        authorId: john.id,
        rating: 5,
        comment:
          "Incredible mountain views and a fantastic experience overall.",
      },
      {
        authorId: anna.id,
        rating: 4,
        comment:
          "The route was beautiful and the accommodation was comfortable.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment: "The tour was good, though some activities were delayed.",
      },
    ],
    [
      {
        authorId: john.id,
        rating: 4,
        comment:
          "An interesting route with several unique and memorable locations.",
      },
      {
        authorId: anna.id,
        rating: 5,
        comment:
          "Excellent tour, great atmosphere, and very professional organization.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment: "Worth visiting, but the group needed clearer instructions.",
      },
    ],
    [
      {
        authorId: john.id,
        rating: 5,
        comment:
          "A fascinating tour filled with history and impressive natural scenery.",
      },
      {
        authorId: anna.id,
        rating: 4,
        comment:
          "Very informative and enjoyable, with plenty of interesting stops.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment:
          "The destinations were interesting, but the journey was quite long.",
      },
    ],
    [
      {
        authorId: john.id,
        rating: 4,
        comment: "A peaceful location and a great escape from the city.",
      },
      {
        authorId: anna.id,
        rating: 5,
        comment:
          "Beautiful lake, wonderful atmosphere, and an unforgettable experience.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment:
          "The place was beautiful, but more activities would have been nice.",
      },
    ],
    [
      {
        authorId: john.id,
        rating: 5,
        comment:
          "A wonderful combination of culture, history, and natural beauty.",
      },
      {
        authorId: anna.id,
        rating: 4,
        comment: "A well-organized tour with several impressive attractions.",
      },
      {
        authorId: michael.id,
        rating: 3,
        comment: "Interesting overall, although a few stops felt too short.",
      },
    ],
  ];

  const reviewsData = tours.flatMap((tour, tourIndex) =>
    reviewsByTour[tourIndex].map((review) => ({
      tourId: tour.id,
      ...review,
    })),
  );

  await prisma.review.createMany({
    data: reviewsData,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    console.error("Database seed failed");
    await prisma.$disconnect();
    process.exit(1);
  });
