"use client";

import { Eye, EyeOff } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Input } from "./input";

export interface PasswordInputProps extends ComponentPropsWithoutRef<typeof Input> {
  toggleLabel?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, toggleLabel = "Нууц үгийг харах/нуух", ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const resolvedType = visible ? "text" : type ?? "password";

    return (
      <div className="relative">
        <Input ref={ref} className={cn("pr-10", className)} type={resolvedType} {...props} />
        <button
          type="button"
          className="absolute inset-y-0 right-2 flex items-center rounded-sm px-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setVisible((state) => !state)}
          aria-label={toggleLabel}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
