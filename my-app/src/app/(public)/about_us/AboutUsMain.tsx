import { Text } from "@/components/Text";
import AboutUsFirstSection from "./AboutUsFirstSection";
import AboutUsLastSection from "./AboutUsLastSection";
import AboutUsMiddleSection from "./AboutUsMiddleSection";

export default function AboutUsMain() {
  return (
    <section className="pt-12.5 pb-12.5 px-4 md:pt-37.5 md:pb-50 md:px-20 bg-primary-white -z-10">
      <div className="mb-7.5 md:mb-50">
        <Text as="h2" color="black" size="xl" className="uppercase md:mb-25">
          We change the idea of traveling in Canada!
        </Text>
        <div className="grid md:grid-cols-3 justify-end gap-5 md:gap-7.5">
          <p></p>
          <Text as="p" color="black60" size="sm">
            Magical places and fantastic entertainment are two main components
            of our tours in Ukraine. Although, we must admit, there are several
            more, more prosaic: clear planning, fair price and constant
            improvement.
          </Text>
          <Text as="p" color="black60" size="sm">
            Traveling with Blackroad is not just a tourist product: each of them
            has particles of magic and fairy tales. And we try very hard to make
            you feel them.
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-7.5 md:gap-50">
        <AboutUsFirstSection />

        <AboutUsMiddleSection />

        <AboutUsLastSection />
      </div>
    </section>
  );
}
