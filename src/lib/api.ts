import axios, { AxiosHeaders } from "axios";

import { getStoredToken, normalizeError } from "@/lib/utils";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

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
  (error) => Promise.reject(normalizeError(error))
);

export type ApiClient = typeof api;
