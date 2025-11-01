import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-card hover:-translate-y-0.5 hover:shadow-hover active:translate-y-0 active:shadow-card",
        destructive:
          "bg-destructive text-destructive-foreground shadow-card hover:bg-destructive/90",
        outline:
          "border border-border/60 bg-background/80 text-foreground shadow-sm backdrop-blur-sm hover:border-border hover:bg-background",
        secondary:
          "bg-secondary text-secondary-foreground shadow-card hover:-translate-y-0.5 hover:shadow-hover active:translate-y-0",
        ghost:
          "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 rounded-md px-4 text-sm",
        lg: "h-12 rounded-lg px-7 text-base",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, size, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...rest} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
