import Carousel from "@/components/Carousel";
import { dbFindPopularTours } from "@/lib/repositories/tour.repo";

export default async function TravelWithUs() {
  const popularTours = await dbFindPopularTours();

  return (
    <>
      <Carousel tours={popularTours} componentTitle="travel with us" />
    </>
  );
}
