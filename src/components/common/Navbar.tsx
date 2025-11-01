"use client";

import { Menu, MoonStar, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messages } from "@/lib/i18n";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const appName = messages.mn.appName;
  const searchPlaceholder = messages.mn.navbar.searchPlaceholder;

  const initials = useMemo(() => appName.slice(0, 2).toUpperCase(), [appName]);
  const isDark = resolvedTheme === "dark";

  return (
    <header
      className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur transition-colors supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="grid gap-3 px-4 py-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="shrink-0 md:hidden"
            aria-label="Цэс нээх"
            title="Цэс нээх"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </Button>
          <span className="text-lg font-semibold tracking-tight text-primary">
            {appName}
          </span>
        </div>

        <div className="relative flex h-10 w-full items-center sm:max-w-xl">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-10 w-full rounded-full bg-muted/60 pl-9 text-sm text-foreground transition-colors focus-visible:ring-primary"
          />
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Харагдах байдлыг солих"
            title="Харагдах байдлыг солих"
            className="transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5" aria-hidden />
            ) : (
              <MoonStar className="h-5 w-5" aria-hidden />
            )}
          </Button>
          <Avatar className="h-9 w-9 border border-accent/60 text-sm font-semibold text-foreground">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
