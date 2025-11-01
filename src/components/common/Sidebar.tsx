"use client";

import { motion } from "framer-motion";
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
import { messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  isMobile?: boolean;
  onNavigate?: () => void;
  onToggleCollapse?: () => void;
}

const NAV_ITEMS = messages.mn.sidebar.items.map((item) => {
  switch (item.href) {
    case "/":
      return { ...item, icon: Home };
    case "/jobs":
      return { ...item, icon: Briefcase };
    case "/jobs/new":
      return { ...item, icon: PlusCircle };
    case "/messages":
      return { ...item, icon: MessageSquare };
    case "/profile":
      return { ...item, icon: UserIcon };
    default:
      return item;
  }
});

export function Sidebar({ className, collapsed = false, isMobile = false, onNavigate, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between gap-4 px-3 py-6",
        collapsed && !isMobile ? "px-2" : "px-4",
        className
      )}
    >
      <nav className="flex flex-1 flex-col gap-1" aria-label="Хажуугийн цэс">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon as typeof Home;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              title={!isMobile && collapsed ? item.label : undefined}
              className={cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2 text-body transition-all duration-200 ease-premium",
                collapsed && !isMobile ? "justify-center px-2" : "justify-start",
                isActive
                  ? "bg-accent/20 text-foreground"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              )}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                {isActive && !isMobile ? (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-accent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <Icon className="relative h-5 w-5" aria-hidden />
              </span>
              <span
                className={cn(
                  "truncate",
                  collapsed && !isMobile ? "hidden" : "block"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {!isMobile ? (
        <div className="pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleCollapse?.()}
            aria-label="Харагдах байдлыг солих"
            aria-pressed={collapsed}
            className="w-full justify-center gap-2 rounded-full border border-border/60 bg-muted/40"
            disabled={!onToggleCollapse}
          >
            {collapsed ? (
              <>
                <ChevronRight className="h-4 w-4" aria-hidden />
                <span className="text-body-sm">Нээх</span>
              </>
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" aria-hidden />
                <span className="text-body-sm">Хураах</span>
              </>
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
