import { TourPayload } from "@/types/tour.types";
import ToursListItem from "./ToursListItem";
import { Text } from "@/components/Text";

type ToursListProps = {
  paginateListData: TourPayload[];
  favoriteToursList:
    | {
        id: number;
        tourId: number;
      }[]
    | null;
};

export default function ToursList({ paginateListData, favoriteToursList }: ToursListProps) {
  return (
    <ul className="grid md:grid-cols-2 gap-4 md:gap-7.5">
      {paginateListData.length === 0 ? (
        <li>
          <Text as="p" color="white" size="md">
            No tours with the specified criteria
          </Text>
        </li>
      ) : (
        paginateListData.map((item) => (
          <ToursListItem
            key={item.id}
            itemData={item}
            favoriteToursList={favoriteToursList}
          />
        ))
      )}
    </ul>
  );
}
