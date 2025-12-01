import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex  items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-sm text-sm  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-dark-secondary-100  hover:bg-primary/90",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "md:border border-dark-secondary-100 md:rounded underline md:no-underline text-sm md:text-base text-dark-secondary-100 hover:shadow-sm hover:bg-gray-50",
        secondary:
          "bg-background-secondary text-dark-secondary-100 shadow-sm hover:bg-background-secondary/80",
        ghost: "hover:bg-gray-100 text-dark-secondary-100",
        link: "text-primary underline-offset-4 hover:underline",
        dark: "bg-dark-secondary-100 text-neutral hover:bg-dark-secondary-100/80",
      },
      size: {
        default: "h-11.5 px-6 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        md: "h-10  px-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>;
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  ref,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

Button.displayName = "Button";

export { Button, buttonVariants };
