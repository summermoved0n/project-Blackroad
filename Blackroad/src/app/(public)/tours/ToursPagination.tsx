import { useFilters } from "@/hooks/useFilters";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import clsx from "clsx";

type ToursPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function ToursPagination({
  currentPage,
  totalPages,
}: ToursPaginationProps) {
  const { setPage, getPages } = useFilters();
  const pages = getPages(currentPage, totalPages);

  return (
    <div className="py-7.5 md:pt-14 md:py-0 flex items-center justify-center gap-10">
      <button
        className="h-6 w-6 flex justify-center items-center"
        onClick={() => {
          setPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </button>

      <div className="flex items-center justify-center gap-7.5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={clsx(
              "text-2xl h-full w-6",
              page === currentPage ? "text-white" : "text-white/50",
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="h-6 w-6 flex justify-center items-center"
        onClick={() => {
          setPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
