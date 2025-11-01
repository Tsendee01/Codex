"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

import { Navbar } from "@/components/common/Navbar";
import { Sidebar } from "@/components/common/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

const STORAGE_KEY = "app-sidebar-collapsed";

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const reduceMotion = useReducedMotion();

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

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "relative hidden border-r border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-[width] duration-250 ease-premium md:sticky md:top-0 md:flex md:h-screen", 
          isCollapsed ? "md:w-20" : "md:w-60"
        )}
      >
        <Sidebar
          className="h-full w-full overflow-y-auto"
          collapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((previous) => !previous)}
        />
      </aside>
      <div className="flex min-h-screen w-full flex-1 flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} collapsed={isCollapsed} onCollapse={() => setIsCollapsed((prev) => !prev)} />
        <main className="relative flex-1 overflow-y-auto bg-gradient-to-b from-support/10 via-transparent to-transparent">
          <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key="app-shell-content"
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-8 pb-16"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-[min(20rem,90vw)] border-none bg-background/90 p-0 pb-8 pt-6"
        >
          <Sidebar
            className="h-full overflow-y-auto"
            isMobile
            onNavigate={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
