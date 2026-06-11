import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { Text } from "@/components/Text";

export default function BookingPathNames({ title }: { title: string }) {
  return (
    <div className="w-fit m-auto flex gap-2 items-center py-3 px-5 bg-primary rounded-md mb-8">
      <Text as="p" color="white60" size="xs">
        Main
      </Text>
      <ChevronRightIcon pageLinkChevron />
      <Text as="p" color="white60" size="xs">
        {title}
      </Text>
      <ChevronRightIcon pageLinkChevron />
      <Text as="p" color="white60" size="xs">
        Booking
      </Text>
    </div>
  );
}
