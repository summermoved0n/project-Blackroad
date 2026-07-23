"use client";

import {
  includedInTheTour,
  notIncludedInTheTour,
} from "@/lib/data/toursPageData";
import { notFound } from "next/navigation";
import TourInfo from "./TourInfo";
import TourDates from "./TourDates";
import TourInclude from "./TourInclude";
import TourAdvantages from "./TourAdvantages";
import Reviews from "@/app/(public)/home/Reviews";
import TourPolicy from "./TourPolicy";
import TourOrder from "./TourOrder";
import TourSchedule from "./TourSchedule";
import { TourPayload, TourReviewsPayload } from "@/types/tour.types";
import { useEffect } from "react";
import { FilterField } from "@/types/filter.types";
import { useRouter } from "next/navigation";
import { useFilters } from "@/hooks/useFilters";

type TourDetailsProps = {
  tourData: TourPayload | null;
  tourReviews: TourReviewsPayload[];
  favoriteToursList:
    | {
        id: number;
        tourId: number;
      }[]
    | null;
};

export default function TourDetails({
  tourData,
  tourReviews,
  favoriteToursList,
}: TourDetailsProps) {
  if (!tourData) {
    notFound();
  }
  const router = useRouter();
  const { searchParams } = useFilters();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!params.has(FilterField.adults)) {
      params.set(FilterField.adults, "2");
    }

    if (!params.has(FilterField.children)) {
      params.set(FilterField.children, "0");
    }

    if (!params.has(FilterField.rooms)) {
      params.set(FilterField.rooms, "1");
    }

    router.replace(`?${params.toString()}`);
  }, []);

  return (
    <main className="pt-17 sm:pt-20 bg-primary">
      <div className="bg-secondary px-4 md:px-20 pt-4 md:pt-6.5 pb-12.5 md:pb-37.5">
        <TourInfo tourData={tourData} favoriteToursList={favoriteToursList} />
        <TourDates tourDates={tourData.departures} slug={tourData.slug} />
        <TourInclude
          included={includedInTheTour}
          notIncluded={notIncludedInTheTour}
        />
        <TourAdvantages />
        <TourSchedule />
        <Reviews tourReviews={tourReviews} isDark />
        <div className="pt-12.5 md:pt-37.5 flex flex-col gap-5 md:gap-7.5">
          <TourPolicy />
          <TourOrder />
        </div>
      </div>
    </main>
  );
}
