"use client";

import { Text } from "@/app/components/Text";
import { cancellationPolicy } from "@/lib/data/toursPageData";
import { ArrowDownIcon } from "@/lib/icons/ArrowDownIcon";
import { ChevronRightIcon } from "@/lib/icons/ChevronRightIcon";
import { clsx } from "clsx";
import { useState } from "react";

export default function TourPolicy() {
  const [showPolicy, setShowPolicy] = useState(false);
  return (
    <section>
      <div className="p-5 md:p-15 bg-[#171717]">
        <button
          className={clsx(
            "flex items-center justify-between w-full",
            showPolicy && "mb-7.5",
          )}
          type="button"
          onClick={() => setShowPolicy(!showPolicy)}
        >
          <Text as="h2" color="white" size="md">
            Cancellation Policy
          </Text>
          {showPolicy ? <ArrowDownIcon isBig /> : <ChevronRightIcon />}
        </button>

        {showPolicy && (
          <ol className="pl-5 list-decimal marker:text-white/60 flex flex-col gap-4">
            {cancellationPolicy.map(({ id, text, points }) => (
              <li key={id}>
                <Text as="p" color="white60" size="sm">
                  {text}
                </Text>
                {points && (
                  <ol className="mt-2 pl-5 list-disc marker:text-white/60 flex flex-col gap-2">
                    {points.map((point, index) => (
                      <li key={index}>
                        <Text as="p" color="white60" size="sm">
                          {point}
                        </Text>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
