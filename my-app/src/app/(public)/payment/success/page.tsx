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
      <div className="bg-secondary py-10 px-20">
        <Text as="p" color="white" size="md" className="mb-5">
          {isSuccess ? "Payment successful" : "Payment was not completed"}
        </Text>

        <Text as="p" color="white60" size="sm">
          {isSuccess
            ? "A confirmation email with your booking summary and next steps has been sent to your email address. Please check your inbox (and spam folder if you don't see it)."
            : "Your booking has not been confirmed because the payment was not completed. Please try again or contact our support team if the problem persists."}
        </Text>
      </div>
    </div>
  );
}
