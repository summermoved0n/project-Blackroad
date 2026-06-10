import Link from "next/link";
import { Text } from "./Text";

type ComingSoonProps = {
  title?: string;
  description?: string;
};

export default function ComingSoon({
  title = "Coming Soon",
  description = "This feature is currently under development.",
}: ComingSoonProps) {
  return (
    <div className="bg-[#171717] pt-17 md:pt-20">
      <div className="bg-[#1e1e1f] py-20 flex flex-col items-center justify-center gap-10">
        <Text as="h1" color="white" size="lg">
          {title}
        </Text>

        <Text as="h2" color="white60" size="md">
          {description}
        </Text>

        <Link
          href="/"
          className="flex h-12.5 w-50 justify-center items-center border border-[#ea9c3f] hover:bg-[#ea9c3f] transition"
        >
          <span className="text-white">Main</span>
        </Link>
      </div>
    </div>
  );
}
