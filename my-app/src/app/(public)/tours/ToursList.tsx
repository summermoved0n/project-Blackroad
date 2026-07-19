import { TourListPayload } from "@/types/tour.types";
import ToursListItem from "./ToursListItem";

type ToursListProps = {
  paginateListData: TourListPayload[];
  favoriteToursList:
    | {
        id: number;
        tourId: number;
      }[]
    | null;
};

export default function ToursList({
  paginateListData,
  favoriteToursList,
}: ToursListProps) {
  return (
    <ul className="grid md:grid-cols-2 gap-4 md:gap-7.5">
      {paginateListData.map((item) => (
        <ToursListItem
          key={item.id}
          itemData={item}
          favoriteToursList={favoriteToursList}
        />
      ))}
    </ul>
  );
}
