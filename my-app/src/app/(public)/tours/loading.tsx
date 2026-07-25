import Spinner from "@/components/ui/loader/Spinner";

export default function Loading() {
  return (
    <div className="text-white w-screen h-screen md:h-full md:w-full md:py-117 md:pb-100 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
