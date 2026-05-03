"use client";

import SearchForm from "../components/SearchForm";
import Filter from "../components/Filter";
import { useFilters } from "@/lib/hooks/useFilters";
import { toursListData } from "@/lib/data/toursPageData";
import ToursPagination from "./ToursPagination";
import ToursList from "./ToursList";
import SortBy from "./SortBy";
import SearchFormMobile from "./SearchFormMobile";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const toursPerPage = 4;
const totalPages = Math.ceil(toursListData.length / toursPerPage);

export default function ToursSearchForm() {
  const [pickDate, setPickDate] = useState<DateRange | undefined>();
  const [showModal, setShowModal] = useState(false);

  const { searchParams } = useFilters();
  const currentPage = Number(searchParams.get("page") || 1);
  const paginateListData = toursListData.slice(
    (currentPage - 1) * toursPerPage,
    toursPerPage * currentPage,
  );

  return (
    <section className="bg-[#1e1e1f]">
      <SearchFormMobile
        pickDate={pickDate}
        setPickDate={setPickDate}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="py-5 px-4 md:py-25 md:px-20">
        <div className="hidden xl:block bg-[#171717] rounded-xl md:mb-25">
          <SearchForm
            pickDate={pickDate}
            setPickDate={setPickDate}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>

        <SortBy />

        <div className="grid lg:grid-cols-[1fr_2fr] md:gap-7.5">
          <div className="hidden lg:block">
            <Filter />
          </div>
          <ToursList paginateListData={paginateListData} />
        </div>

        <ToursPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
