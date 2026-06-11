import { dataOfCustomers } from "@/lib/data/homePageData";
import { Text } from "@/components/Text";

export default function WhyChooseUs() {
  return (
    <section
      className="px-4 py-12.5 md:px-20 md:pt-25 md:pb-37.5 bg-secondary
"
    >
      <Text
        as="h2"
        color="white"
        size="lg"
        spacing="sm"
        className="pb-25 flex justify-center"
      >
        WHY CHOOSE US?
      </Text>

      <div className="flex flex-col lg:flex-row items-center md:justify-between gap-5 lg:gap-0">
        {dataOfCustomers.map(({ id, numbers, text }) => (
          <div
            key={id}
            className="w-75 h-75 flex flex-col items-center justify-center gap-2.5 border border-white/10 rounded-full"
          >
            <Text as="p" color="white" size="xl">
              {numbers}
            </Text>
            <Text as="p" color="white60" size="sm">
              {text}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
