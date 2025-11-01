import { AxiosError } from "axios";

export type FieldErrors = Record<string, string | string[] | undefined>;

export type NormalizedError = {
  message: string;
  status?: number;
  fieldErrors?: FieldErrors;
  isNetworkError?: boolean;
};

function extractFieldErrors(payload: unknown): FieldErrors | undefined {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const possible = payload as Record<string, unknown>;
  const errors = possible.errors ?? possible.details ?? possible.fieldErrors;

  if (!errors || typeof errors !== "object") {
    return undefined;
  }

  return Object.entries(errors as Record<string, unknown>).reduce<FieldErrors>((acc, [key, value]) => {
    if (value == null) {
      return acc;
    }

    if (Array.isArray(value)) {
      acc[key] = value.map((item) => String(item));
      return acc;
    }

    acc[key] = String(value);
    return acc;
  }, {});
}

export function normalizeAxiosError(error: unknown): NormalizedError {
  if (typeof error === "string") {
    return { message: error };
  }

  if (error instanceof Error && !(error as AxiosError).isAxiosError) {
    return { message: error.message };
  }

  const axiosError = error as AxiosError<{
    message?: string;
    error?: string;
    errors?: FieldErrors;
    details?: FieldErrors;
    fieldErrors?: FieldErrors;
  }>;

  if (axiosError?.isAxiosError) {
    const isNetworkError = axiosError.code === "ERR_NETWORK" || axiosError.message === "Network Error";
    const payload = axiosError.response?.data;
    const messageFromPayload = payload?.message ?? payload?.error;
    const status = axiosError.response?.status;

    if (isNetworkError || (!status && axiosError.message)) {
      return {
        message: "Сүлжээний алдаа. Дахин оролдоно уу.",
        status,
        isNetworkError: true
      };
    }

    return {
      message: messageFromPayload ?? axiosError.message ?? "Алдаа гарлаа",
      status,
      fieldErrors: extractFieldErrors(payload)
    };
  }

  return { message: "Тодорхойгүй алдаа гарлаа" };
}
