import { type NormalizedError } from "@/lib/errors";
import { getStoredToken } from "@/lib/utils";

type TokenResolver = () => string | null;
type UnauthorizedCallback = (error: NormalizedError) => void;

let resolveToken: TokenResolver = getStoredToken;
let handleUnauthorized: UnauthorizedCallback | null = null;

export function setAuthTokenGetter(getter: TokenResolver | null) {
  resolveToken = getter ?? getStoredToken;
}

export function setUnauthorizedHandler(handler: UnauthorizedCallback | null) {
  handleUnauthorized = handler;
}

export function getAuthToken(): string | null {
  try {
    return resolveToken?.() ?? null;
  } catch {
    return null;
  }
}

export function notifyUnauthorized(error: NormalizedError) {
  handleUnauthorized?.(error);
}

export type TokenManager = {
  getToken: () => string | null;
  onUnauthorized: (error: NormalizedError) => void;
};

export function getTokenManager(): TokenManager {
  return {
    getToken: getAuthToken,
    onUnauthorized: notifyUnauthorized
  };
}
