"use client";

import { ArrowDownIcon } from "@/lib/icons/ArrowDownIcon";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { FilterIcon } from "@/lib/icons/FilterIcon";
import { ArrowUpDownIcon } from "@/lib/icons/ArrowUpDownIcon";
import Modal from "../components/Modal";
import { useRef, useState } from "react";
import Filter from "../components/Filter";
import SortByList from "./SortByList";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { sortOptions } from "@/lib/data/toursPageData";

export default function SortBy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [showSortList, setShowSortList] = useState(false);
  const [sortName, setSortName] = useState("default");
  useClickOutside(containerRef, () => setShowSortList(false));

  return (
    <div className="flex flex-col md:flex-row lg:justify-between md:items-center mt-12.5 mb-7.5 md:mb-12.5 md:mt-0">
      <Text
        as="h3"
        color="white"
        size="lg"
        spacing="sm"
        className="uppercase mb-7.5 md:mb-0"
      >
        choose a tour
      </Text>

      <div
        ref={containerRef}
        className="relative hidden lg:flex items-center gap-7.5"
      >
        <Text as="p" color="white" size="md">
          Sort by:
        </Text>

        <button
          type="button"
          className="flex items-center gap-7.5"
          onClick={() => {
            setShowSortList(!showSortList);
          }}
        >
          <Text as="p" color="white60" size="sm" className="w-37 text-right">
            {sortName}
          </Text>

          <ArrowDownIcon />
        </button>

        {showSortList && (
          <div className="absolute w-full top-10 bg-[#171717] p-5 flex flex-col gap-2.5 z-20">
            {sortOptions.map(({ id, label }) => (
              <SortByList
                key={id}
                label={label}
                setShowSortList={setShowSortList}
                setSortName={setSortName}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 w-full lg:hidden">
        <Button
          variant="primary"
          size="sm"
          className="flex justify-center items-center gap-2"
          onClick={() => setOpenFilterModal(true)}
        >
          <FilterIcon />
          <Text as="span" color="white" size="sm">
            Filters
          </Text>
        </Button>

        <Button
          variant="primary"
          size="sm"
          className="flex justify-center items-center gap-2"
          onClick={() => setOpenSortModal(true)}
        >
          <ArrowUpDownIcon />
          <Text as="span" color="white" size="sm">
            Sort by
          </Text>
        </Button>
      </div>

      <Modal openModal={openFilterModal} setOpenModal={setOpenFilterModal}>
        <Filter />
      </Modal>

      <Modal openModal={openSortModal} setOpenModal={setOpenSortModal}>
        {openSortModal && (
          <div className="absolute w-full top-10 p-4">
            <Text as="p" color="white" size="md" className="text-[20px] mb-10">
              Sort by
            </Text>
            <div className="flex flex-col gap-7.5">
              {sortOptions.map(({ id, label }) => (
                <SortByList
                  key={id}
                  label={label}
                  setOpenSortModal={setOpenSortModal}
                  setSortName={setSortName}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
