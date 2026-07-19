import ToursTable from "./ToursTable";
import ToursTabelMobile from "./ToursTabelMobile";
import { Text } from "@/components/Text";

type TourDatesProps = {
  slug: string;
  tourDates: {
    id: number;
    tourId: number;
    startDate: Date;
    endDate: Date;
    departureCity: string;
    status: string;
  }[];
};

export default function TourDates({ tourDates, slug }: TourDatesProps) {
  return (
    <section className="py-12.5 md:py-25">
      <Text
        as="h2"
        color="white"
        size="lg"
        className="uppercase md:mb-12.5 pb-7.5 md:pb-0"
      >
        Dates and prices
      </Text>

      <div className="md:hidden">
        {tourDates.map((item) => (
          <ToursTabelMobile key={item.id} tourDate={item} slug={slug} />
        ))}
      </div>

      <ToursTable tourDates={tourDates} slug={slug} />
    </section>
  );
}
