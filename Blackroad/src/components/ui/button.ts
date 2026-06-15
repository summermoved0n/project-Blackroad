import { cva } from "class-variance-authority";

export const button = cva("text-base transition", {
  variants: {
    variant: {
      primary:
        "h-[50px] text-white bg-transparent border-1 border-solid border-[#ea9c3f] hover:bg-accent",
      secondary: "h-[40px] text-black",
      tertiary: "h-[74px] w-[74px] rounded-full bg-accent",
    },
    size: {
      sm: "w-full md:w-[200px]",
      md: "w-[466px]",
      lg: "w-[514px]",
      xl: "w-[614px]",
    },
  },
});
