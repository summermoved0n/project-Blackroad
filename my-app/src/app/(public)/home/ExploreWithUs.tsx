import ButtonWithArrow from "@/components/ButtonWithArrow";
import { Text } from "@/components/Text";

export default function ExploreWithUs() {
  return (
    <section className="py-12.5 px-4 md:py-37.5 md:px-20 bg-primary-white">
      <Text className="mb-25" as="h2" color="black" size="xl" spacing="sm">
        EXPLORE CANADA WITH US
      </Text>
      <div className="flex flex-col md:flex-row justify-end gap-7.5">
        <div className="flex flex-col items-start justify-start gap-15">
          <Text className="w-102" color="black60" size="sm">
            We have been organizing tours in Ukraine since 2007 and have not
            missed a single day. Because in our country there are many unknown
            and unexplored places that are worth visiting and showing them to
            others. Our goal is to change the perception of traveling in
            Ukraine.
          </Text>

          <ButtonWithArrow path="/about_us">
            Get more about Blackroad
          </ButtonWithArrow>
        </div>

        <Text className="w-102" as="p" color="black60" size="sm">
          Experienced travelers, guides, specialists who worked in tourist
          complexes in different parts of the world work on creating tours.
          There are no random people. Only those who are passionate about
          tourism and want to develop it here in Ukraine.
        </Text>
      </div>
    </section>
  );
}
