"use client";

import {
  includedInTheTour,
  notIncludedInTheTour,
  toursListData,
} from "@/lib/data/toursPageData";
import { notFound, useParams } from "next/navigation";
import TourInfo from "./TourInfo";
import TourDates from "./TourDates";
import TourInclude from "./TourInclude";
import TourAdvantages from "./TourAdvantages";
import Reviews from "@/app/home/Reviews";
import TourPolicy from "./TourPolicy";
import TourOrder from "./TourOrder";
import TourSchedule from "./TourSchedule";

export default function TourDetails() {
  const tourDetails = useParams();
  const tourData = toursListData.find(
    (item) => item.id === Number(tourDetails.id),
  );

  if (!tourData) {
    notFound();
  }

  return (
    <main className="pt-17 sm:pt-20 bg-[#171717]">
      <div className="bg-[#1e1e1f] px-20 pt-6.5 pb-37.5">
        <TourInfo tourData={tourData} />
        <TourDates />
        <TourInclude
          included={includedInTheTour}
          notIncluded={notIncludedInTheTour}
        />
        <TourSchedule />
        <TourAdvantages />
        <Reviews isDark />
        <div className="pt-37.5 flex flex-col gap-7.5">
          <TourPolicy />
          <TourOrder />
        </div>
      </div>
    </main>
  );
}
