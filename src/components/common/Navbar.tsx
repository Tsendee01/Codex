"use client";

import { Menu, MoonStar, Plus, Search, Sun, PanelLeftClose, PanelLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messages } from "@/lib/i18n";

interface NavbarProps {
  onToggleSidebar: () => void;
  collapsed?: boolean;
  onCollapse?: () => void;
}

export function Navbar({ onToggleSidebar, collapsed = false, onCollapse }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const appName = messages.mn.appName;
  const searchPlaceholder = messages.mn.navbar.searchPlaceholder;

  const initials = useMemo(() => appName.slice(0, 2).toUpperCase(), [appName]);
  const isDark = resolvedTheme === "dark";

  return (
    <header
      className="sticky top-0 z-30 border-b border-border/60 bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/55"
      role="banner"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden"
            aria-label="Цэс нээх"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </Button>
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1">
            <span className="text-sm font-semibold text-primary">{appName}</span>
            <Badge variant="mint" className="hidden text-[11px] sm:inline-flex">
              Тогтвортой өсөлт
            </Badge>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-3 md:flex">
          <div className="relative w-full max-w-xl">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-12 rounded-full border-border/50 bg-muted/40 pl-12 pr-5"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onCollapse?.()}
            aria-label="Хажуугийн самбарыг солих"
            className="hidden md:inline-flex"
          >
            {collapsed ? <PanelLeft className="h-5 w-5" aria-hidden /> : <PanelLeftClose className="h-5 w-5" aria-hidden />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Харагдах байдлыг солих"
            className="transition-colors"
          >
            {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <MoonStar className="h-5 w-5" aria-hidden />}
          </Button>
          <Button variant="default" className="hidden sm:inline-flex">
            <Plus className="mr-1.5 h-4 w-4" aria-hidden />
            Шинэ ажил
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
