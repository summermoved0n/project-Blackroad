"use client";

import { CircleIcon } from "@/components/icons/CircleIcon";
import { Button } from "./Button";
import { useRouter } from "next/dist/client/components/navigation";
import { ArrowInCircle } from "@/components/icons/ArrowInCircle";

type ButtonWithArrowProps = {
  children: React.ReactNode;
  className?: string;
  path?: string;
};

export default function ButtonWithArrow({
  children,
  className,
  path,
  ...props
}: ButtonWithArrowProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(path || "/");
  };

  return (
    <Button
      variant="secondary"
      className={`${className} relative flex items-center gap-0 hover:text-accent transition`}
      onClick={handleClick}
      {...props}
    >
      {children}
      <CircleIcon />
      <div className="absolute right-2.5">
        <ArrowInCircle />
      </div>
    </Button>
  );
}
