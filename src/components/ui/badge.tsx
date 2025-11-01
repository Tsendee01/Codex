import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ease-premium",
  {
    variants: {
      variant: {
        default: "border-accent/60 bg-accent/30 text-foreground",
        secondary: "border-border/60 bg-muted/60 text-muted-foreground",
        mint: "border-accent/70 bg-accent/40 text-accent-foreground",
        outline: "border-border/70 text-muted-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
