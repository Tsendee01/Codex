import axios, { AxiosHeaders } from "axios";

import { normalizeAxiosError, type NormalizedError } from "@/lib/errors";
import { getStoredToken } from "@/lib/utils";

type TokenResolver = () => string | null;
type UnauthorizedCallback = (error: NormalizedError) => void;

let resolveToken: TokenResolver = getStoredToken;
let handleUnauthorized: UnauthorizedCallback | null = null;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = resolveToken?.() ?? null;

  if (token) {
    const headers = config.headers ?? {};

    if (headers instanceof AxiosHeaders) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      (headers as Record<string, unknown>)["Authorization"] = `Bearer ${token}`;
    }

    config.headers = headers;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeAxiosError(error);

    if (normalized.status === 401) {
      handleUnauthorized?.(normalized);
    }

    return Promise.reject(normalized);
  }
);

export function setAuthTokenGetter(getter: TokenResolver | null) {
  resolveToken = getter ?? getStoredToken;
}

export function setUnauthorizedHandler(handler: UnauthorizedCallback | null) {
  handleUnauthorized = handler;
}

export type ApiClient = typeof api;
