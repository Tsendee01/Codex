import { ReactNode } from "react";

import { AppShell } from "@/components/common/AppShell";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
