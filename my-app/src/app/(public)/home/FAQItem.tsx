"use client";

import { PlusIcon } from "@/components/icons/PlusIcon";
import { useState } from "react";
import { MinusIcon } from "@/components/icons/MinusIcon";
import { Text } from "@/components/Text";

type FAQItemProps = { question: string; description: string };

export default function FAQItem({ question, description }: FAQItemProps) {
  const [showText, setShowText] = useState(false);

  return (
    <li className="py-10 border-t last:border-b border-t-black/10 last:border-b-black/10 ">
      <div className="flex justify-between items-center gap-2 w-full">
        <Text as="h3" color="black" size="sm">
          {question}
        </Text>

        <button
          className="text-primary transition hover:text-accent focus:text-accent"
          type="button"
          onClick={() => setShowText(!showText)}
        >
          {!showText ? <PlusIcon /> : <MinusIcon />}
        </button>
      </div>

      {showText && (
        <Text as="p" color="black60" size="sm" className="w-[80%] mt-7.5">
          {description}
        </Text>
      )}
    </li>
  );
}
