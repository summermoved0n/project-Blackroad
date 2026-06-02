"use client";

import { Text } from "./Text";
import SelectCity from "./SelectCity";
import SelectDate from "./SelectDate";
import SelectPeopleAndRooms from "./SelectPeopleAndRooms";
import Modal from "./Modal";
import DatePicker from "./DatePicker";
import { DateRange } from "react-day-picker";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type SearchFormProps = {
  pickDate: DateRange | undefined;
  setPickDate: Dispatch<SetStateAction<DateRange | undefined>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function SearchForm({
  pickDate,
  setPickDate,
  showModal,
  setShowModal,
}: SearchFormProps) {
  const router = useRouter();
  return (
    <div className="hidden md:pl-10 md:h-17.5 md:w-full xl:pl-15 md:backdrop-blur-sm rounded-xl md:grid md:grid-cols-[1fr_1fr_1fr_180px] md:gap-12.5">
      <SelectCity />
      <SelectDate setShowModal={setShowModal} pickDate={pickDate} />
      <SelectPeopleAndRooms />
      <button
        className="flex items-center justify-center border-l border-white/10"
        type="button"
        onClick={() => router.push("/tours")}
      >
        <Text as="p" color="white" size="md">
          Search
        </Text>
      </button>

      <Modal openModal={showModal} setOpenModal={setShowModal}>
        <DatePicker setPickDate={setPickDate} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}
