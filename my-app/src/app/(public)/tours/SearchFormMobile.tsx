"use client";

import SelectCity from "@/components/SelectCity";
import SelectDate from "@/components/SelectDate";
import SelectPeopleAndRooms from "@/components/SelectPeopleAndRooms";
import { PopularToursProps } from "@/types/tour.types";
import { Dispatch, SetStateAction } from "react";

type SearchFormMobileProps = {
  tours: PopularToursProps[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function SearchFormMobile({
  tours,
  setShowModal,
}: SearchFormMobileProps) {
  return (
    <section className="xl:hidden py-5 px-4 bg-primary">
      <div className="mb-5">
        <SelectCity tours={tours} />
        <SelectDate setShowModal={setShowModal} />
        <SelectPeopleAndRooms />
      </div>
    </section>
  );
}
