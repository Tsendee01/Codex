"use client";

import { getAuthToken, notifyUnauthorized } from "@/lib/api";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/lib/auth";
import type { NormalizedError } from "@/lib/errors";
import { sleep } from "@/lib/utils";
import { MockApiError } from "@/mock/error";

const USERS_STORAGE_KEY = "tuslah_mock_users";
const TOKEN_PREFIX = "mock-token";

type StoredUser = AuthUser & { password: string };

type MockDatabase = {
  users: StoredUser[];
  hasHydrated: boolean;
};

const db: MockDatabase = {
  users: [
    {
      id: "user_demo",
      name: "Ж.Тэмүүлэн",
      email: "demo@tuslah.app",
      role_flags: ["creator"],
      password: "password123"
    },
    {
      id: "user_manager",
      name: "Б.Марал",
      email: "manager@tuslah.app",
      role_flags: ["manager"],
      password: "manager123"
    }
  ],
  hasHydrated: false
};

function hydrateUsers() {
  if (typeof window === "undefined" || db.hasHydrated) {
    return;
  }

  const stored = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as StoredUser[];
      if (Array.isArray(parsed)) {
        db.users = parsed.map((item) => ({ ...item }));
      }
    } catch {
      // Ignore corrupted local storage and fall back to defaults.
    }
  } else {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(db.users));
  }

  db.hasHydrated = true;
}

function persistUsers() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(db.users));
}

function ensureUsers(): StoredUser[] {
  hydrateUsers();
  return db.users;
}

function sanitizeUser(user: StoredUser): AuthUser {
  const { password, ...rest } = user;
  void password;
  return rest;
}

function findUserByEmail(email: string) {
  const lower = email.trim().toLowerCase();
  return ensureUsers().find((user) => user.email.toLowerCase() === lower);
}

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function createToken(userId: string) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${TOKEN_PREFIX}:${userId}:${random}`;
}

function extractUserIdFromToken(token: string | null) {
  if (!token) {
    return null;
  }

  const parts = token.split(":");
  if (parts[0] !== TOKEN_PREFIX || parts.length < 2) {
    return null;
  }

  return parts[1] ?? null;
}

export type LoginResponse = {
  access_token: string;
  user: AuthUser;
};

export type RegisterResponse = {
  id: string;
};

export async function mockLogin(payload: LoginPayload): Promise<LoginResponse> {
  await sleep(400);
  const user = findUserByEmail(payload.email);

  if (!user || user.password !== payload.password) {
    throw new MockApiError("Имэйл эсвэл нууц үг буруу байна.", {
      status: 401,
      fieldErrors: {
        email: "Имэйл эсвэл нууц үг буруу байна.",
        password: "Имэйл эсвэл нууц үг буруу байна."
      }
    });
  }

  const token = createToken(user.id);
  return {
    access_token: token,
    user: sanitizeUser(user)
  };
}

export async function mockRegister(payload: RegisterPayload): Promise<RegisterResponse> {
  await sleep(450);
  const existing = findUserByEmail(payload.email);

  if (existing) {
    throw new MockApiError("Энэ имэйлээр бүртгэл үүссэн байна.", {
      status: 400,
      fieldErrors: {
        email: "Энэ имэйлээр бүртгэл үүссэн байна."
      }
    });
  }

  const id = generateId("user");
  const newUser: StoredUser = {
    id,
    name: payload.name,
    email: payload.email.trim(),
    password: payload.password,
    role_flags: ["creator"]
  };

  ensureUsers().push(newUser);
  persistUsers();

  return { id };
}

export async function mockMe(): Promise<AuthUser> {
  await sleep(300);
  const token = getAuthToken();
  const userId = extractUserIdFromToken(token);

  if (!userId) {
    throw new MockApiError("Нэвтрэх шаардлагатай.", { status: 401 });
  }

  const user = ensureUsers().find((item) => item.id === userId);

  if (!user) {
    const unauthorized: NormalizedError = {
      message: "Нэвтрэх хугацаа дууссан. Дахин оролдоно уу.",
      status: 401
    };
    notifyUnauthorized(unauthorized);
    throw new MockApiError(unauthorized.message, { status: unauthorized.status });
  }

  return sanitizeUser(user);
}

export async function mockLogout(): Promise<void> {
  await sleep(200);
}
