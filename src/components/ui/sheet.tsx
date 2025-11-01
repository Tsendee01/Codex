import * as SheetPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-40 bg-black/40 backdrop-blur-md", className)}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

type SheetSide = "top" | "bottom" | "left" | "right";

const sheetSides: Record<SheetSide, string> = {
  top: "inset-x-0 top-0 border-b",
  bottom: "inset-x-0 bottom-0 border-t",
  left: "inset-y-0 left-0 h-full border-r md:max-w-sm",
  right: "inset-y-0 right-0 h-full border-l md:max-w-sm"
};

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & { side?: SheetSide }
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content asChild {...props}>
      <motion.div
        ref={ref}
        role="dialog"
        initial={{ x: side === "right" ? 80 : side === "left" ? -80 : 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: side === "right" ? 80 : side === "left" ? -80 : 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className={cn(
          "fixed z-50 grid h-full gap-6 bg-card/90 p-6 shadow-hover backdrop-blur-lg",
          "border-border/60",
          sheetSides[side],
          className
        )}
      >
        {children}
        <SheetClose className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted/70 text-muted-foreground transition-all duration-200 ease-premium hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <X className="h-4 w-4" />
          <span className="sr-only">Хаах</span>
        </SheetClose>
      </motion.div>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-3", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
};
