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

export default function TourDetails({
  tourData,
  tourReviews,
}: {
  tourData: TourPayload | null;
  tourReviews: TourReviewsPayload[];
}) {
  if (!tourData) {
    notFound();
  }

  return (
    <main
      className="pt-17 sm:pt-20 bg-primary
"
    >
      <div className="bg-secondary px-4 md:px-20 pt-4 md:pt-6.5 pb-12.5 md:pb-37.5">
        <TourInfo tourData={tourData} />
        <TourDates />
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
