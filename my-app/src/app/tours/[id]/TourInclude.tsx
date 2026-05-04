import { Text } from "@/app/components/Text";

export default function TourInclude({
  included,
  notIncluded,
}: {
  included: string[];
  notIncluded: string[];
}) {
  return (
    <section className="py-12.5 md:py-25">
      <Text
        as="h2"
        color="white"
        size="lg"
        className="uppercase mb-7.5 md:mb-12.5"
      >
        What is included in the tour price?
      </Text>

      <div className="grid md:grid-cols-2 gap-5 md:gap-10">
        <div>
          <Text as="h3" color="white" size="sm" className="mb-7.5">
            The price includes
          </Text>

          <ol className="list-disc marker:text-[#ea9c3f] flex flex-col gap-4 pl-4">
            {included.map((item, i) => (
              <li key={i} className="pl-2 relative">
                <Text as="p" color="white60" size="sm">
                  {item}
                </Text>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <Text as="h3" color="white" size="sm" className="mb-7.5">
            Not included
          </Text>

          <ol className="list-disc marker:text-[#ea9c3f] flex flex-col gap-4 pl-4">
            {notIncluded.map((item, i) => (
              <li key={i} className="pl-2 relative">
                <Text as="p" color="white60" size="sm">
                  {item}
                </Text>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
