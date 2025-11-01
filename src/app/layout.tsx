import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { messages, defaultLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers/AppProviders";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: messages[defaultLocale].appName,
  description: "Нэг удаагийн ажлын зах зээлийн удирдлагын самбар",
  metadataBase: new URL("https://example.com")
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
