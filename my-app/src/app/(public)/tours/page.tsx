import ToursSearchForm from "./ToursSearchForm";
import ToursHero from "./ToursHero";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const toursList = await prisma.tour.findMany();

  return (
    <main>
      <ToursHero />
      <ToursSearchForm toursListData={toursList} />
    </main>
  );
}
