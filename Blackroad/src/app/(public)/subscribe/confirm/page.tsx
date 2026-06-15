import SubscribeBtn from "./SubscribeBtn";
import { Text } from "@/components/Text";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  console.log(token);
  return (
    <main className="bg-primary pt-17 md:pt-20">
      <div className="bg-secondary p-20">
        <Text as="h1" color="white" size="md" className="mb-10">
          Click button to subscribe
        </Text>
        <SubscribeBtn token={token} />
      </div>
    </main>
  );
}
