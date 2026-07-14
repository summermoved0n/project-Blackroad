import Modal from "@/components/Modal";
import { Text } from "@/components/Text";
import { cancellationPolicy } from "@/lib/data/toursPageData";
import { useState } from "react";

export default function BookingFormPolicy() {
  const [showPolicy, setShowPolicy] = useState(false);
  return (
    <section>
      <div className="w-full flex flex-col gap-5">
        <button
          className="w-fit"
          type="button"
          onClick={() => setShowPolicy(!showPolicy)}
        >
          <Text
            as="h2"
            color="white"
            size="sm"
            className="hover:text-accent transition"
          >
            Cancellation Policy
          </Text>
        </button>

        <button className="w-fit" type="button">
          <Text
            as="h2"
            color="white"
            size="sm"
            className="hover:text-accent transition"
          >
            Order Policy
          </Text>
        </button>
      </div>

      <Modal openModal={showPolicy} setOpenModal={setShowPolicy}>
        <div className="px-20 pt-20">
          <Text as="h2" color="white" size="md" className="mb-10">
            Cancellation Policy
          </Text>
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
        </div>
      </Modal>
    </section>
  );
}
