"use client";

import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Home,
  MessageSquare,
  PlusCircle,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  isMobile?: boolean;
  onNavigate?: () => void;
  onToggleCollapse?: () => void;
}

const NAV_ITEMS = [
  {
    label: "Тойм",
    href: "/",
    icon: Home
  },
  {
    label: "Ажил хайх",
    href: "/jobs",
    icon: Briefcase
  },
  {
    label: "Ажил үүсгэх",
    href: "/jobs/new",
    icon: PlusCircle
  },
  {
    label: "Мессеж",
    href: "/messages",
    icon: MessageSquare
  },
  {
    label: "Профайл",
    href: "/profile",
    icon: UserIcon
  }
] as const;

export function Sidebar({
  className,
  collapsed = false,
  isMobile = false,
  onNavigate,
  onToggleCollapse
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between gap-2 bg-background",
        className
      )}
    >
      <nav
        className={cn(
          "space-y-1 px-2 py-4",
          collapsed && !isMobile ? "px-1" : "px-2"
        )}
        role="navigation"
        aria-label="Хажуугийн цэс"
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40",
                isActive
                  ? "bg-muted text-primary md:border-l-4 md:border-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && !isMobile
                  ? "justify-center px-2"
                  : "justify-start"
              )}
            >
              <Icon
                aria-hidden
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "whitespace-nowrap",
                  collapsed && !isMobile && "hidden"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      {!isMobile ? (
        <div className={cn("px-2 pb-4", collapsed && "px-1")}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleCollapse?.()}
            aria-label="Харагдах байдлыг солих"
            aria-pressed={collapsed}
            title="Харагдах байдлыг солих"
            className="w-full justify-center"
            disabled={!onToggleCollapse}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" aria-hidden />
            ) : (
              <ChevronLeft className="h-5 w-5" aria-hidden />
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
