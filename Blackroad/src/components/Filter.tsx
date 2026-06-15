"use client";

import { Text } from "./Text";
import DualRange from "./DualRange";
import Checkbox from "./Checkbox";
import { useFilters } from "@/hooks/useFilters";

export default function Filter() {
  const { toggleFilter, setFilter, searchParams, clearFilter } = useFilters();

  const getSelected = (key: string) => searchParams.get(key)?.split(",") || [];

  const selectedType = getSelected("type");
  const selectedTours = getSelected("tourType");
  const selectedCategories = getSelected("category");
  const selectedRating = getSelected("rating");

  return (
    <div className="flex flex-col gap-10 py-10 px-7.5 bg-primary h-fit">
      <Text as="h4" color="white" size="md">
        All filters
      </Text>

      <div className="flex flex-col gap-5">
        <Text as="p" color="white60" size="sm">
          Your budget (per night)
        </Text>

        <DualRange />
      </div>

      <div className="flex flex-col gap-5 items-start">
        <Text as="p" color="white60" size="sm">
          Property Type
        </Text>

        <Checkbox
          checked={selectedType.includes("hotels")}
          onChange={() => toggleFilter("type", "hotels")}
          label="Hotels"
        />
        <Checkbox
          checked={selectedType.includes("cottages")}
          onChange={() => toggleFilter("type", "cottages")}
          label="Cottages"
        />
        <Checkbox
          checked={selectedType.includes("appartments")}
          onChange={() => toggleFilter("type", "appartments")}
          label="Appartments"
        />
      </div>

      <div className="flex flex-col gap-5 items-start">
        <Text as="p" color="white60" size="sm">
          Tours
        </Text>

        <Checkbox
          checked={selectedTours.includes("individual")}
          onChange={() => toggleFilter("tourType", "individual")}
          label="Individual"
        />
        <Checkbox
          checked={selectedTours.includes("group")}
          onChange={() => toggleFilter("tourType", "group")}
          label="Group"
        />
      </div>

      <div className="flex flex-col gap-5 items-start">
        <Text as="p" color="white60" size="sm">
          Categories
        </Text>

        <Checkbox
          checked={selectedCategories.includes("mountains")}
          onChange={() => toggleFilter("category", "mountains")}
          label="Mountains"
        />
        <Checkbox
          checked={selectedCategories.includes("lakes")}
          onChange={() => toggleFilter("category", "lakes")}
          label="Lakes"
        />
      </div>

      <div className="flex flex-col gap-5 items-start">
        <Text as="p" color="white60" size="sm">
          Property rating
        </Text>

        <Checkbox
          checked={selectedRating.includes("1")}
          onChange={() => setFilter("rating", "1")}
          label="1 star"
        />
        <Checkbox
          checked={selectedRating.includes("2")}
          onChange={() => setFilter("rating", "2")}
          label="2 stars"
        />
        <Checkbox
          checked={selectedRating.includes("3")}
          onChange={() => setFilter("rating", "3")}
          label="3 stars"
        />
        <Checkbox
          checked={selectedRating.includes("4")}
          onChange={() => setFilter("rating", "4")}
          label="4 stars"
        />
        <Checkbox
          checked={selectedRating.includes("5")}
          onChange={() => setFilter("rating", "5")}
          label="5 stars"
        />
      </div>

      <button
        className="flex w-fit group"
        type="button"
        onClick={() => clearFilter()}
      >
        <Text
          as="p"
          color="white60"
          size="sm"
          className="group-hover:text-accent transition"
        >
          Clear filters
        </Text>
      </button>
    </div>
  );
}
