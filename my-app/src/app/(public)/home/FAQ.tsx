import { faqData } from "@/lib/data/homePageData";
import Link from "next/link";
import FAQItem from "./FAQItem";
import { Text } from "@/components/Text";

export default function FAQ() {
  return (
    <section className="py-12.5 px-4 md:py-37.5 md:px-20 grid md:grid-cols-[400px_1fr] justify-between items-start bg-primary-white">
      <Text as="h2" color="black" size="lg" className="mb-7.5 md:mb-0">
        FAQ
      </Text>

      <ul>
        {faqData.map(({ id, question, description }) => (
          <FAQItem key={id} question={question} description={description} />
        ))}

        <li className="border-t border-black/10 pt-7.5 ">
          <Link href="/faq" className="w-fit">
            <Text as="h3" color="black50" size="sm">
              All questions
            </Text>
          </Link>
        </li>
      </ul>
    </section>
  );
}
