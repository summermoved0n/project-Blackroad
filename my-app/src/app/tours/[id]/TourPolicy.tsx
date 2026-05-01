"use client";

import { Text } from "@/app/components/Text";
import { ArrowDownIcon } from "@/lib/icons/ArrowDownIcon";
import { ChevronRightIcon } from "@/lib/icons/ChevronRightIcon";
import { clsx } from "clsx";
import { useState } from "react";

const contentClass =
  "content-'' before:w-1 before:h-1 before:bg-white/60 before:rounded-full before:top-1/2 before:-left-[15px] before:absolute";

export default function TourPolicy() {
  const [showPolicy, setShowPolicy] = useState(false);
  return (
    <section className="pt-37.5">
      <div className="p-15 bg-[#171717]">
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
          <ul className="flex flex-col justify-start gap-4">
            <li className="flex gap-3">
              <Text as="span" color="white60" size="sm">
                1.
              </Text>
              <Text as="p" color="white60" size="sm">
                The Agreement comes into force from the moment of acceptance
                (acceptance) of this offer and is valid until the end of the
                Tour term, but in any case until the parties fully fulfill their
                obligations.
              </Text>
            </li>
            <li className="flex gap-3">
              <Text as="span" color="white60" size="sm">
                2.
              </Text>
              <Text as="p" color="white60" size="sm">
                The Agreement may be terminated ahead of schedule, at the
                initiative of one of the Parties, but not earlier than the date
                of all mutual settlements between the Tourist and the Tour
                Operator/Travel Agent.
              </Text>
            </li>
            <li className="flex flex-col gap-2">
              <div className="flex gap-3">
                <Text as="span" color="white60" size="sm">
                  3.
                </Text>
                <Text as="p" color="white60" size="sm">
                  This Agreement shall terminate:
                </Text>
              </div>
              <div className="flex flex-col gap-2 pl-6">
                <Text as="p" color="white60" size="sm" className="relative">
                  <span className={contentClass}></span>
                  early by mutual agreement of the Parties;
                </Text>
                <Text as="p" color="white60" size="sm" className="relative">
                  <span className={contentClass}></span>
                  early on the initiative of one of the Parties in accordance
                  with the procedure provided for herein;
                </Text>
                <Text as="p" color="white60" size="sm" className="relative">
                  <span className={contentClass}></span>
                  in other cases stipulated by the current legislation of
                  Ukraine.
                </Text>
              </div>
            </li>
            <li className="flex gap-3">
              <Text as="span" color="white60" size="sm">
                4.
              </Text>
              <Text as="p" color="white60" size="sm">
                In case of termination of the Agreement at the initiative of the
                Tourist, the Tourist is returned the amount deposited with the
                deduction of penalties from it in the amount of 25% of the total
                cost of the Tour.
              </Text>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
