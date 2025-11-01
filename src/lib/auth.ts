import type { LoginResponse, RegisterResponse } from "@/mock/auth";
import { mockLogin, mockLogout, mockMe, mockRegister } from "@/mock/auth";

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

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return mockLogin(payload);
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  return mockRegister(payload);
}

export async function me(): Promise<AuthUser> {
  return mockMe();
}

export async function logout(): Promise<void> {
  return mockLogout();
}
