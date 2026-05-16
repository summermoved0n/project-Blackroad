import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.tour.createMany({
    data: [
      {
        title: "Dzhurinsky waterfall",
        description:
          "The most full-flowing plain waterfall of Ukraine, which is considered one of the most picturesque and interesting places of Ternopil region.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815312/blackroad_tours/Travel_with_us_waterfall_iqxo3a.jpg",
        category: "Mountains",
        rating: 5,
        price: 5000,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
      {
        title: "Rest in the canyon",
        description:
          "Moving to the picturesque rock canyon in the village of Buki. Excursion in the form of an easy walk, during which you will see what a large-scale natural event took place here.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815313/blackroad_tours/Travel_with_us_canyon_goukbs.jpg",
        category: "Mountains",
        rating: 4.9,
        price: 3000,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
      {
        title: "Blue lakes and ancient Lubech",
        description:
          "Excursion to Lubech, once a Viking trading post, or to the city of the future Slavutich. Swimming in the cleanest lakes with water of incredible color.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815307/blackroad_tours/Popular_tours_lake_tdtotq.jpg",
        category: "Lakes",
        rating: 4.8,
        price: 3300,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
      {
        title: "Autumn in the mountains",
        description:
          "Walking in the crowns of trees and watching bears. Rest in a mountain hotel and meeting dawn in the mountains.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778815308/blackroad_tours/Popular_tours_mountains_hhwa8z.jpg",
        category: "Mountains",
        rating: 5.0,
        price: 6200,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
      {
        title: "Unusual Rivne region",
        description:
          "A journey in which we combined unique historical projects and locations! Riding on ancient boats in the park of historical reconstruction of boatbuilding.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900865/blackroad_tours/5_1_neomf4.jpg",
        category: "Lakes",
        rating: 5.0,
        price: 3350,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
      {
        title: "Secrets of Podolia and Gaidamak Yar",
        description:
          "Rare and very beautiful tour. Unknown to tourists Podolsk land. One of the oldest rock monasteries. Mysterious Gaydamak ravine with bizarre rocks and petrified creatures.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900867/blackroad_tours/kseniia-rastvorova-VoHG1dLjTpo-unsplash_1_gt98fl.jpg",
        category: "Mountains",
        rating: 4.9,
        price: 4350,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
      {
        title: "Buchak - a place of power",
        description:
          "A unique place of power is Lake Buchak, which may soon disappear. Hurry to see! The opportunity to swim in Lake Buchak.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900866/blackroad_tours/Ozero-Buchak-s_1_cv6xhw.jpg",
        category: "Lakes",
        rating: 5.0,
        price: 2500,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
      {
        title: "Franco-tour: nature and other masterpieces of Galicia",
        description:
          "Visit the incredible pharmacy-museum of the inventor of the oil industry Johann Zeg. You will see an ancient rock monastery and the only Greek Catholic Lavra.",
        imageUrl:
          "https://res.cloudinary.com/dc3ape1zd/image/upload/v1778900865/blackroad_tours/unsplash_4nAh6u7dD1g_ohi8lc.jpg",
        category: "Lakes",
        rating: 5.0,
        price: 6250,

        route: [
          "Verkhovyna",
          "Vizhnitsa",
          "Kamenetz",
          "Podolsky",
          "Satanov",
          "Chernivtsi",
        ],
        tourDates: [new Date("2026-10-19"), new Date("2026-11-09")],

        duration: 4,
        food: "Breakfasts",

        dateOfArrival: new Date("2026-05-10"),
        dateOfDeparture: new Date("2026-05-15"),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
