import Carousel from "@/components/Carousel";
import { dbFindPopularTours } from "@/lib/repositories/tour.repo";

export default async function PopularTours() {
  const popularTours = await dbFindPopularTours();
  return (
    <>
      <Carousel tours={popularTours} componentTitle="popular tours" />
    </>
  );
}
