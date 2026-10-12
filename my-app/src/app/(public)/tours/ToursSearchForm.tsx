"use client";

import { useFilters } from "@/hooks/useFilters";
import ToursPagination from "./ToursPagination";
import ToursList from "./ToursList";
import SortBy from "./SortBy";
import SearchFormMobile from "./SearchFormMobile";
import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import Filter from "@/components/Filter";
import { PopularToursProps, TourListPayload } from "@/types/tour.types";
import { Text } from "@/components/Text";

const toursPerPage = 4;

type ToursListProps = {
  allToursList: PopularToursProps[];
  filteredToursList: TourListPayload[];
  favoriteToursList:
    | {
        id: number;
        tourId: number;
      }[]
    | null;
};

export default function ToursSearchForm({
  allToursList,
  filteredToursList,
  favoriteToursList,
}: ToursListProps) {
  const totalPages = Math.ceil(filteredToursList.length / toursPerPage);

  const { searchParams } = useFilters();

  const [showModal, setShowModal] = useState(false);

  const currentPage = Number(searchParams.get("page") || 1);
  const paginateListData = filteredToursList.slice(
    (currentPage - 1) * toursPerPage,
    toursPerPage * currentPage,
  );

  const isShowTours = paginateListData && paginateListData.length > 0;

  return (
    <section>
      <SearchFormMobile setShowModal={setShowModal} tours={allToursList} />

      <div className="py-5 px-4 md:py-25 md:px-20">
        <div className="hidden xl:block bg-primary rounded-xl md:mb-25">
          <SearchForm
            showModal={showModal}
            setShowModal={setShowModal}
            tours={allToursList}
            fromTours
          />
        </div>

        <SortBy />

        <div className="grid lg:grid-cols-[1fr_2fr] md:gap-7.5">
          <div className="hidden lg:block">
            <Filter />
          </div>
          {!isShowTours ? (
            <Text as="p" color="white" size="md">
              No tours with the specified criteria
            </Text>
          ) : (
            <ToursList
              paginateListData={paginateListData}
              favoriteToursList={favoriteToursList}
            />
          )}
        </div>

        {isShowTours && filteredToursList.length > toursPerPage && (
          <ToursPagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </section>
  );
}
