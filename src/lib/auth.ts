import { api } from "@/lib/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role_flags?: string[] | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  user: AuthUser;
};

type RegisterResponse = {
  id: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", payload);
  return response.data;
}

export async function me(): Promise<AuthUser> {
  const response = await api.get<AuthUser>("/auth/me");
  return response.data;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // Allow graceful fallback for APIs without logout endpoint.
  }
}
