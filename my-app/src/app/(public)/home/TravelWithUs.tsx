import Carousel from "@/components/Carousel";
import { PopularToursProps } from "@/types/tour.types";

export default async function TravelWithUs({
  popularTours,
}: {
  popularTours: PopularToursProps[];
}) {
  return (
    <>
      <Carousel tours={popularTours} componentTitle="travel with us" />
    </>
  );
}
