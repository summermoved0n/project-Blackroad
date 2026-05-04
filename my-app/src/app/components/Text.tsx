import { text } from "@/lib/ui/text";
import { cn } from "@/lib/ui/cn";

type TextProps = {
  children: React.ReactNode;
  color:
    | "white"
    | "white20"
    | "white60"
    | "white80"
    | "black"
    | "black50"
    | "black60"
    | "orange";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  spacing?: "sm";
  className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

export function Text({
  as,
  color,
  size,
  spacing,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as || "p";

  return (
    <Component
      className={cn(text({ color, size, spacing }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
