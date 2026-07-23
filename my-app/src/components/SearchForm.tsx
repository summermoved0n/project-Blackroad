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
import clsx from "clsx";

type SearchFormProps = {
  tours: { id: number; slug: string; title: string }[];
  fromTours?: boolean;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function SearchForm({
  tours,
  fromTours,
  showModal,
  setShowModal,
}: SearchFormProps) {
  const router = useRouter();
  const { searchParams } = useFilters();

  return (
    <div
      className={clsx(
        "md:w-full md:gap-5 md:grid xl:gap-7.5",
        fromTours
          ? "md:px-10 xl:px-10 md:grid-cols-[1fr_1fr_1fr]"
          : "md:pl-10 xl:pl-10 md:grid-cols-[1fr_1fr_1fr_180px]",
      )}
    >
      <SelectCity tours={tours} />
      <SelectDate setShowModal={setShowModal} />
      <SelectPeopleAndRooms />
      {!fromTours && (
        <button
          className="flex items-center justify-center border-l border-white/10 sm:text-2xl text-white hover:text-accent focus:text-accent transition"
          type="button"
          onClick={() => router.push(`/tours?${searchParams}`)}
        >
          Search
        </button>
      )}

      <Modal openModal={showModal} setOpenModal={setShowModal} isUIModal>
        <div className="pt-40 md:pt-50 flex flex-col items-center justify-center gap-5">
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
