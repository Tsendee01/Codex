import { MockApiError } from "@/mock/error";

export type FieldErrors = Record<string, string | string[] | undefined>;

export type NormalizedError = {
  message: string;
  status?: number;
  fieldErrors?: FieldErrors;
  isNetworkError?: boolean;
};

export function normalizeAxiosError(error: unknown): NormalizedError {
  if (typeof error === "string") {
    return { message: error };
  }

  if (error instanceof MockApiError) {
    return {
      message: error.message,
      status: error.status,
      fieldErrors: error.fieldErrors
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  if (error && typeof error === "object") {
    const possible = error as { message?: string; status?: number; fieldErrors?: FieldErrors };
    if (possible.message) {
      return {
        message: possible.message,
        status: possible.status,
        fieldErrors: possible.fieldErrors
      };
    }
  }

  return { message: "Тодорхойгүй алдаа гарлаа" };
}
