"use client";

import BookingInfoRating from "./BookingInfoRating";
import BookingInfoDates from "./BookingInfoDates";
import BookingInfoPrice from "./BookingInfoPrice";
import { useFilters } from "@/hooks/useFilters";
import { FilterField } from "@/types/filter.types";
import { TourPayload } from "@/types/tour.types";

export default function BookingInfo({ tour }: { tour: TourPayload }) {
  const { departures } = tour;
  const { searchParams } = useFilters();

  const adults = searchParams.get(FilterField.adults);
  const children = searchParams.get(FilterField.children);
  const rooms = searchParams.get(FilterField.rooms);
  const roomType = searchParams.get("roomType");

  const capasityData = { adults, children, rooms };

  const departureDateId = searchParams.get("departureDates");
  const departureDates = departures.find(
    (item) => item.id === Number(departureDateId),
  );
  console.log(departureDates);
  return (
    <section className="flex flex-col gap-7.5">
      <BookingInfoRating tour={tour} />

      <BookingInfoDates
        departureDates={departureDates}
        capasityData={capasityData}
      />

      <BookingInfoPrice
        price={tour.price}
        capasityData={capasityData}
        roomType={roomType}
      />
    </section>
  );
}
