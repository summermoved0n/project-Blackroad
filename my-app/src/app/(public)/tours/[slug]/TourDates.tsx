import ToursTable from "./ToursTable";
import { toursDatesData } from "@/lib/data/toursPageData";
import ToursTabelMobile from "./ToursTabelMobile";
import { Text } from "@/components/Text";

export default function TourDates() {
  return (
    <section className="py-12.5 md:py-25">
      <Text
        as="h2"
        color="white"
        size="lg"
        className="uppercase md:mb-12.5 border-b border-white/10 pb-7.5 md:pb-0"
      >
        Dates and prices
      </Text>

      <div className="md:hidden">
        {toursDatesData.map(
          ({
            id,
            departure: departureDate,
            return: returnDate,
            cityFrom,
            price,
          }) => (
            <ToursTabelMobile
              key={id}
              departureDate={departureDate}
              cityFrom={cityFrom}
              returnDate={returnDate}
              price={price}
            />
          ),
        )}
      </div>

      <ToursTable data={toursDatesData} />
    </section>
  );
}
