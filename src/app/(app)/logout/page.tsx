"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    void logout();
  }, [logout]);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center space-y-2 p-6 text-center">
      <p className="text-sm text-muted-foreground">Гарч байна...</p>
      <span className="sr-only" aria-live="polite">
        Амжилттай гарлаа. Та түр хүлээнэ үү.
      </span>
    </div>
  );
}
