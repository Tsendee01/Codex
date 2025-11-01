"use client";

import { useRouter } from "next/navigation";
import { ComponentType, ReactNode, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

export function GuardedLayout({ children }: { children: ReactNode }) {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace("/auth/sign-in");
    }
  }, [isLoading, token, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <span aria-live="assertive" className="sr-only">
        Нэвтрэх шаардлагатай.
      </span>
    );
  }

  return <>{children}</>;
}

export function withAuthGuard<P>(Component: ComponentType<P>) {
  const GuardedComponent = (props: P) => (
    <GuardedLayout>
      <Component {...props} />
    </GuardedLayout>
  );

  GuardedComponent.displayName = `WithAuthGuard(${Component.displayName ?? Component.name ?? "Component"})`;

  return GuardedComponent;
}
