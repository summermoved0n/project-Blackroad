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
