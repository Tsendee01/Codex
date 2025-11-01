"use client";

import { useCallback, useEffect } from "react";
import { useSyncExternalStore } from "react";

import { getStoredToken, persistToken } from "@/lib/utils";

type AuthUser = {
  name?: string;
  email: string;
};

type AuthState = {
  status: "unauthenticated" | "authenticated" | "loading";
  user: AuthUser | null;
  token: string | null;
};

type AuthListener = () => void;

type AuthStore = {
  getState: () => AuthState;
  subscribe: (listener: AuthListener) => () => void;
  setState: (nextState: Partial<AuthState>) => void;
  reset: () => void;
};

const defaultState: AuthState = {
  status: "unauthenticated",
  user: null,
  token: null
};

const listeners = new Set<AuthListener>();
let state = defaultState;

const store: AuthStore = {
  getState: () => state,
  subscribe: (listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
  setState: (nextState) => {
    state = {
      ...state,
      ...nextState
    };

    listeners.forEach((listener) => listener());
  },
  reset: () => {
    state = defaultState;
    listeners.forEach((listener) => listener());
  }
};

export function useAuth() {
  const snapshot = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  useEffect(() => {
    if (snapshot.token) {
      return;
    }

    const storedToken = getStoredToken();
    if (storedToken) {
      store.setState({ token: storedToken, status: "authenticated" });
    }
  }, [snapshot.token]);

  const setLoading = useCallback((loading: boolean) => {
    store.setState({ status: loading ? "loading" : snapshot.token ? "authenticated" : "unauthenticated" });
  }, [snapshot.token]);

  const login = useCallback((params: { user: AuthUser; token: string }) => {
    persistToken(params.token);
    store.setState({
      status: "authenticated",
      user: params.user,
      token: params.token
    });
  }, []);

  const logout = useCallback(() => {
    persistToken(null);
    store.reset();
  }, []);

  return {
    ...snapshot,
    login,
    logout,
    setLoading
  };
}
