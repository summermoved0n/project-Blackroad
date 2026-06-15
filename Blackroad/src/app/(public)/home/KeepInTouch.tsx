import SubscribeField from "@/components/SubscribeField";
import { Text } from "@/components/Text";
import Image from "next/image";

export default function KeepInTouch() {
  return (
    <section className="relative w-full h-212.5 px-4 xl:px-0 bg-black/40 flex flex-col items-center justify-center gap-7.5">
      <Text as="h2" color="white" size="lg" spacing="sm">
        Keep in touch
      </Text>

      <Text as="p" color="white60" size="md" spacing="sm">
        Subscribe now and get the first special offers and the latest travel
        news.
      </Text>

      <SubscribeField isKeepInTouch />

      <Image
        src="/images/Keep_in_touch.jpg"
        alt="Mountain Landscape"
        fill
        className="object-cover object-center -z-10"
        sizes="100vw"
        loading="eager"
      />
    </section>
  );
}
