import type { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type NormalizedError = {
  message: string;
  status?: number;
  details?: Record<string, unknown>;
};

export const ACCESS_TOKEN_KEY = "tuslah_access_token";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeError(error: unknown): NormalizedError {
  if (typeof error === "string") {
    return { message: error };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  const axiosError = error as AxiosError<{ message?: string; error?: string }>;
  if (axiosError?.isAxiosError) {
    const payload = axiosError.response?.data;
    const message = payload?.message ?? payload?.error ?? axiosError.message;

    return {
      message: message ?? "Алдаа гарлаа",
      status: axiosError.response?.status,
      details: typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : undefined
    };
  }

  return { message: "Тодорхойгүй алдаа гарлаа" };
}

export function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function persistToken(token: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
