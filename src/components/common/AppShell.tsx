"use client";

import { ReactNode, useState } from "react";

import { Navbar } from "@/components/common/Navbar";
import { Sidebar } from "@/components/common/Sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-card/40 sm:block">
          <Sidebar className="sticky top-[72px]" />
        </aside>
        <main className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="px-4 py-2">
            <SheetTitle>Цэс</SheetTitle>
          </SheetHeader>
          <Sidebar className="border-t" onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
