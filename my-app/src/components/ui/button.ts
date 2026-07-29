import { cva } from "class-variance-authority";

export const button = cva("text-base transition", {
  variants: {
    variant: {
      primary:
        "h-[50px] text-white bg-transparent border border-accent hover:bg-accent focus:bg-accent disabled:hover:bg-transparent disabled:border-white/20 disabled:text-white/20 disabled:cursor-not-allowed",
      secondary: "h-[40px] text-black",
      tertiary:
        "h-[74px] w-[74px] rounded-full bg-accent border border-accent text-white hover:bg-transparent hover:text-accent focus:bg-transparent focus:text-accent transition",
    },
    size: {
      sm: "w-full md:w-[200px]",
      md: "w-[466px]",
      lg: "w-[514px]",
      xl: "w-[614px]",
    },
  },
});
