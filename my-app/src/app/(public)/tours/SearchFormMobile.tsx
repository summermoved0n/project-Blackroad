"use client";

import { Button } from "@/components/Button";
import SelectCity from "@/components/SelectCity";
import SelectDate from "@/components/SelectDate";
import SelectPeopleAndRooms from "@/components/SelectPeopleAndRooms";
import { Dispatch, SetStateAction } from "react";

type SearchFormMobileProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function SearchFormMobile({
  setShowModal,
}: SearchFormMobileProps) {
  return (
    <section className="xl:hidden py-5 px-4 bg-[#171717]">
      <div className="mb-5">
        <SelectCity />
        <SelectDate setShowModal={setShowModal} />
        <SelectPeopleAndRooms />
      </div>

      <Button variant="primary" size="sm">
        Search
      </Button>
    </section>
  );
}
