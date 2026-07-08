"use client";

import { Text } from "./Text";
import SelectCity from "./SelectCity";
import SelectDate from "./SelectDate";
import SelectPeopleAndRooms from "./SelectPeopleAndRooms";
import Modal from "./Modal";
import DatePicker from "./DatePicker";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "@/hooks/useFilters";

type SearchFormProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function SearchForm({
  showModal,
  setShowModal,
}: SearchFormProps) {
  const router = useRouter();
  const { searchParams } = useFilters();

  return (
    <div className="hidden md:pl-10 md:h-17.5 md:w-full xl:pl-15 md:backdrop-blur-sm rounded-xl md:grid md:grid-cols-[1fr_1fr_1fr_180px] md:gap-12.5">
      <SelectCity />
      <SelectDate setShowModal={setShowModal} />
      <SelectPeopleAndRooms />
      <button
        className="flex items-center justify-center border-l border-white/10"
        type="button"
        onClick={() => router.push(`/tours?${searchParams.toString()}`)}
      >
        <Text as="p" color="white" size="md">
          Search
        </Text>
      </button>

      <Modal openModal={showModal} setOpenModal={setShowModal}>
        <div className="pt-40 md:pt-100 flex flex-col items-center justify-center gap-5">
          <Text as="p" color="white" size="lg" className="uppercase">
            your journey
          </Text>

          <Text as="p" color="white60" size="sm">
            Great, now select the start and end dates for your trip.
          </Text>

          <DatePicker setShowModal={setShowModal} />
        </div>
      </Modal>
    </div>
  );
}
