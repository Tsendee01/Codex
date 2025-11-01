"use client";

import { ReactNode, useEffect, useState } from "react";

import { Navbar } from "@/components/common/Navbar";
import { Sidebar } from "@/components/common/Sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { messages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

const STORAGE_KEY = "app-sidebar-collapsed";

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (storedValue === "true") {
      setIsCollapsed(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, isCollapsed ? "true" : "false");
  }, [isCollapsed]);

  const appName = messages.mn.appName;

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "hidden border-r bg-background/95 shadow-sm transition-all duration-300 md:sticky md:top-0 md:flex md:h-screen md:overflow-hidden",
          isCollapsed ? "md:w-16" : "md:w-60"
        )}
      >
        <Sidebar
          className="h-full overflow-y-auto"
          collapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((previous) => !previous)}
        />
      </aside>
      <div className="flex min-h-screen w-full flex-1 flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/5 p-4 sm:p-6 dark:bg-zinc-900">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10">
            {children}
          </div>
        </main>
      </div>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b px-4 py-3 text-left">
            <SheetTitle className="text-base font-semibold text-primary">
              {appName}
            </SheetTitle>
          </SheetHeader>
          <Sidebar
            className="h-[calc(100vh-64px)] overflow-y-auto"
            isMobile
            onNavigate={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
