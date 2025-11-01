"use client";

import { Menu, MoonStar, Search, Sun } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useMemo } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { messages } from "@/lib/i18n";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const appName = messages.mn.appName;
  const searchPlaceholder = messages.mn.navbar.searchPlaceholder;
  const initials = useMemo(() => appName.slice(0, 2).toUpperCase(), [appName]);
  const isDark = resolvedTheme === "dark";

  return (
    <header className="flex w-full items-center justify-between gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="sm:hidden"
          aria-label="Цэс нээх"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/" className="text-base font-semibold md:text-lg">
          {appName}
        </Link>
      </div>
      <div className="hidden flex-1 items-center gap-2 sm:flex">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Гэрэл/харангын горим солих"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{appName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/profile" as Route}>Профайл</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/settings" as Route}>Тохиргоо</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Гарах
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
