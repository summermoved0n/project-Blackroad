import clsx from "clsx";
import { Text } from "./Text";
import { useRouter } from "next/navigation";

type ForgotPasswordBtnProps = {
  className?: string;
};

export default function ForgotPasswordBtn({
  className,
}: ForgotPasswordBtnProps) {
  const router = useRouter();
  return (
    <button
      className={clsx(className, "w-fit right-0")}
      type="button"
      onClick={() => router.push("/forgot-password")}
    >
      <Text
        as="p"
        color="white60"
        size="xs"
        className="hover:text-accent transition"
      >
        Forgot password?
      </Text>
    </button>
  );
}
