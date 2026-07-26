import { dbFindNewsletterSubscriber } from "@/lib/repositories/subscribers.repo";
import SubscribeBtn from "./SubscribeBtn";
import { Text } from "@/components/Text";
import NotFound from "@/app/not-found";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  const response = await dbFindNewsletterSubscriber({
    verificationToken: token,
  });

  if (!response || response?.verificationToken !== token) {
    return <NotFound />;
  }

  return (
    <main className="bg-primary pt-17 md:pt-20">
      <div className="bg-secondary p-20">
        <Text as="h1" color="white" size="md" className="mb-7.5">
          Click the button to subscribe
        </Text>
        <SubscribeBtn token={token} />
      </div>
    </main>
  );
}
