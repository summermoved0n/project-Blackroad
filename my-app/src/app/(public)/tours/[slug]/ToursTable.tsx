"use client";

import ToursTableItem from "./ToursTableItem";

type ToursTableProps = {
  slug: string;
  tourDates: {
    id: number;
    tourId: number;
    startDate: Date;
    endDate: Date;
    departureCity: string;
    status: string;
  }[];
};

export default function ToursTable({ tourDates, slug }: ToursTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto py-15 px-15 bg-primary">
      <table className="w-full">
        <thead className="text-white text-left text-md">
          <tr>
            <th className="pb-4 font-light">Date of departure</th>
            <th className="pb-4 font-light">Date of return</th>
            <th className="pb-4 font-light">Choose a room</th>
            <th className="pb-4 font-light">Price</th>
            <th className="pb-4 font-light"></th>
          </tr>
        </thead>

        <tbody>
          {tourDates.map((item) => (
            <ToursTableItem key={item.id} tourDate={item} slug={slug} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
