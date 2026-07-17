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

      <div>
        <ul>
          {faqData.map(({ id, question, description }) => (
            <FAQItem key={id} question={question} description={description} />
          ))}
        </ul>

        <Link
          className="inline-flex mt-10 text-black/50 transition hover:text-accent focus:text-accent"
          type="button"
          href="/faq"
        >
          All questions
        </Link>
      </div>
    </section>
  );
}
