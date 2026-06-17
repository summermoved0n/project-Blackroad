import { Text } from "@/components/Text";
import { stripe } from "@/lib/stripe";

type Props = {
  searchParams: Promise<{
    payment_intent?: string;
  }>;
};

export default async function page({ searchParams }: Props) {
  const { payment_intent } = await searchParams;

  if (!payment_intent) {
    return (
      <div className="pt-20 bg-primary">
        <div className="bg-secondary p-10">
          <Text as="p" color="white" size="md">
            Payment status is unavailable
          </Text>
        </div>
      </div>
    );
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className="pt-20 bg-primary">
      <div className="bg-secondary p-10">
        <Text as="p" color="white" size="md">
          {isSuccess ? "Payment successful" : "Payment is not completed"}
        </Text>
      </div>
    </div>
  );
}
