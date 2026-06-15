"use client";

import { useFilters } from "@/hooks/useFilters";
import ToursPagination from "./ToursPagination";
import ToursList from "./ToursList";
import SortBy from "./SortBy";
import SearchFormMobile from "./SearchFormMobile";
import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import Filter from "@/components/Filter";
import { TourPayload } from "@/types/tour.types";

const toursPerPage = 4;

type ToursListProps = {
  toursListData: TourPayload[];
  favoriteToursList:
    | {
        id: number;
        tourId: number;
      }[]
    | null;
};

export default function ToursSearchForm({
  toursListData,
  favoriteToursList,
}: ToursListProps) {
  const totalPages = Math.ceil(toursListData.length / toursPerPage);

  const { searchParams } = useFilters();

  const [showModal, setShowModal] = useState(false);

  const currentPage = Number(searchParams.get("page") || 1);
  const paginateListData = toursListData.slice(
    (currentPage - 1) * toursPerPage,
    toursPerPage * currentPage,
  );

  return (
    <section
      className="bg-secondary
"
    >
      <SearchFormMobile setShowModal={setShowModal} />

      <div className="py-5 px-4 md:py-25 md:px-20">
        <div className="hidden xl:block bg-primary rounded-xl md:mb-25">
          <SearchForm showModal={showModal} setShowModal={setShowModal} />
        </div>

        <SortBy />

        <div className="grid lg:grid-cols-[1fr_2fr] md:gap-7.5">
          <div className="hidden lg:block">
            <Filter />
          </div>
          <ToursList
            paginateListData={paginateListData}
            favoriteToursList={favoriteToursList}
          />
        </div>

        <ToursPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
