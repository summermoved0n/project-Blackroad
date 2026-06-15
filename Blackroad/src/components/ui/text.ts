import { cva } from "class-variance-authority";

export const text = cva("", {
  variants: {
    color: {
      white: "text-white",
      white20: "text-white/20",
      white60: "text-white/60",
      white80: "text-white/80",
      black: "text-black",
      black50: "text-black/50",
      black60: "text-black/60",

      orange: "text-[rgba(234,156,63,0.6)]",
    },

    size: {
      xs: "text-sm font-light",
      sm: "text-base font-normal",
      md: "text-base sm:text-2xl font-normal",
      lg: "text-[28px] sm:text-5xl font-light",
      xl: "text-[28px] sm:text-6xl font-normal",
    },

    spacing: {
      sm: "tracking-[0.03em] sm:tracking-normal",
    },
  },
  defaultVariants: {
    color: "white",
    size: "md",
  },
});
