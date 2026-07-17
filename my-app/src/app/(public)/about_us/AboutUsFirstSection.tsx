import Image from "next/image";
import { Text } from "@/components/Text";

export default function AboutUsFirstSection() {
  return (
    <section className="grid md:grid-cols-2 md:gap-35">
      <div className="flex flex-col gap-7.5 md:gap-0 justify-between">
        <div className="relative w-full h-95">
          <div className="hidden md:block absolute bg-primary-white h-97 w-7.5 -top-1 left-1/2 transform -translate-x-1/2 z-1"></div>
          <Image
            className="object-cover object-center"
            src="/images/We_change_left.jpg"
            alt="Forest"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
        </div>

        <Text as="p" color="black60" size="sm">
          Every day we create new travel programs, develop routes, expand our
          base of partners in all tourist corners of the country to provide you
          with maximum opportunities for traveling in Canada.
        </Text>
      </div>

      <div className="hidden md:block relative w-full h-191">
        <Image
          className="object-cover object-center"
          src="/images/We_change_right.jpg"
          alt="Forest"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
      </div>
    </section>
  );
}
