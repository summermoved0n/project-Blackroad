import { cva } from "class-variance-authority";

export const button = cva("text-base transition", {
  variants: {
    variant: {
      primary:
        "h-[50px] text-white bg-transparent border-1 border-solid border-accent hover:bg-accent focus:bg-accent",
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
