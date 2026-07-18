import clsx from "clsx";
import { Text } from "./Text";
import { useRouter } from "next/navigation";

type ForgotPasswordBtnProps = {
  className?: string;
  fromLogin?: boolean;
};

export default function ForgotPasswordBtn({
  className,
  fromLogin,
}: ForgotPasswordBtnProps) {
  const router = useRouter();
  return (
    <button
      className={clsx(className, "group w-fit right-0")}
      type="button"
      onClick={() => {
        if (fromLogin) {
          return router.replace("/forgot-password");
        }

        router.push("/forgot-password");
      }}
    >
      <Text
        as="p"
        color="white60"
        size="xs"
        className="group-hover:text-accent group-focus:text-accent transition"
      >
        Forgot password?
      </Text>
    </button>
  );
}
