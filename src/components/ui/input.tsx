import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-border/70 bg-background/80 px-4 text-body text-foreground shadow-inner transition-all duration-200 ease-premium placeholder:text-muted-foreground/70 focus-visible:border-transparent focus-visible:bg-background focus-visible:shadow-[inset_0_0_0_1px_rgba(51,65,85,0.25)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
