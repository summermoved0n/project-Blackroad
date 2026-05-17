import { Suspense } from "react";
import TourDetails from "./TourDetails";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const getTourById = await prisma.tour.findUnique({
    where: { id: Number(id) },
  });

  return (
    <Suspense fallback={null}>
      <TourDetails tourData={getTourById} />
    </Suspense>
  );
}
