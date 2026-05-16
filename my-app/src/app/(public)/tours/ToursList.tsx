import ToursListItem from "./ToursListItem";

type ToursListProps = {
  paginateListData: {
    id: number;
    description: string;
    category: string;
    title: string;
    imageUrl: string;
    rating: number;
    price: number;
  }[];
};

export default function ToursList({ paginateListData }: ToursListProps) {
  return (
    <ul className="grid md:grid-cols-2 gap-4 md:gap-7.5">
      {paginateListData.map((item) => (
        <ToursListItem key={item.id} itemData={item} />
      ))}
    </ul>
  );
}
