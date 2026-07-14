"use client";

import { Text } from "@/components/Text";
import { ArrowDownIcon } from "@/components/icons/ArrowDownIcon";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { clsx } from "clsx";
import { useState } from "react";

export default function TourOrder() {
  const [showOrder, setShowOrder] = useState(false);
  return (
    <section>
      <div
        className="p-5 md:p-15 bg-primary
"
      >
        <button
          className={clsx(
            "flex items-center justify-between w-full text-white text-base sm:text-2xl font-normal hover:text-accent transition",
            showOrder && "mb-7.5",
          )}
          type="button"
          onClick={() => setShowOrder(!showOrder)}
        >
          Order Policy
          {showOrder ? <ArrowDownIcon isBig /> : <ChevronRightIcon />}
        </button>

        {/* {showOrder && (
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
        )} */}
      </div>
    </section>
  );
}
