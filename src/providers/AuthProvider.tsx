"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { setAuthTokenGetter, setUnauthorizedHandler } from "@/lib/api";
import { type AuthUser, logout as apiLogout, me } from "@/lib/auth";
import { type NormalizedError } from "@/lib/errors";
import { getStoredToken, persistToken } from "@/lib/utils";

const PUBLIC_ROUTES = new Set(["/auth/sign-in", "/auth/sign-up"]);

function isPublicRoute(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  for (const route of PUBLIC_ROUTES) {
    if (pathname.startsWith(route)) {
      return true;
    }
  }

  return false;
}

export interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    pathnameRef.current = pathname ?? null;
  }, [pathname]);

  const clearSession = useCallback(() => {
    setTokenState(null);
    setUserState(null);
    tokenRef.current = null;
    persistToken(null);
    setIsLoading(false);
  }, []);

  const setToken = useCallback((nextToken: string | null) => {
    setTokenState(nextToken);
    tokenRef.current = nextToken;
    persistToken(nextToken);
  }, []);

  const setUser = useCallback((nextUser: AuthUser | null) => {
    setUserState(nextUser);
  }, []);

  const handleUnauthorized = useCallback(
    (_error: NormalizedError) => {
      void _error;
      clearSession();

      if (!isPublicRoute(pathnameRef.current ?? null)) {
        router.replace("/auth/sign-in");
      }
    },
    [clearSession, router]
  );

  useEffect(() => {
    setAuthTokenGetter(() => tokenRef.current);
    setUnauthorizedHandler(handleUnauthorized);

    return () => {
      setAuthTokenGetter(getStoredToken);
      setUnauthorizedHandler(null);
    };
  }, [handleUnauthorized]);

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      const storedToken = getStoredToken();

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      tokenRef.current = storedToken;
      setTokenState(storedToken);

      try {
        const profile = await me();
        if (!active) {
          return;
        }
        setUserState(profile);
      } catch {
        if (!active) {
          return;
        }
        clearSession();
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void initialize();

    return () => {
      active = false;
    };
  }, [clearSession]);

  const refresh = useCallback(async () => {
    if (!tokenRef.current) {
      return;
    }

    setIsLoading(true);
    try {
      const profile = await me();
      setUserState(profile);
    } catch {
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearSession]);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // Ignore network or API errors when logging out.
    } finally {
      clearSession();
      toast({ description: "Амжилттай гарлаа." });
      router.replace("/auth/sign-in");
    }
  }, [clearSession, router, toast]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isLoading,
      setToken,
      setUser,
      logout,
      refresh
    }),
    [token, user, isLoading, setToken, setUser, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
