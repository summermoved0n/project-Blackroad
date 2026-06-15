import { Suspense } from "react";
import TourDetails from "./TourDetails";
import { prisma } from "@/lib/prisma";
import { dbFindReview } from "@/lib/repositories/profile.repo";

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

  const tourReviews = await dbFindReview({ tourId: Number(id) });
  console.log("tourReviews", tourReviews);

  return (
    <Suspense fallback={null}>
      <TourDetails tourData={getTourById} tourReviews={tourReviews} />
    </Suspense>
  );
}
