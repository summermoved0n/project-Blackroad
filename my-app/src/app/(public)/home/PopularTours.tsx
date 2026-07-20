import Carousel from "@/components/Carousel";
import { PopularToursProps } from "@/types/tour.types";

export default async function PopularTours({
  popularTours,
}: {
  popularTours: PopularToursProps[];
}) {
  return (
    <>
      <Carousel tours={popularTours} componentTitle="popular tours" />
    </>
  );
}
