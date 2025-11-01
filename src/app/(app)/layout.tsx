import { ReactNode } from "react";

import { AppShell } from "@/components/common/AppShell";
import { GuardedLayout } from "@/middleware-guard";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <GuardedLayout>
      <AppShell>{children}</AppShell>
    </GuardedLayout>
  );
}
