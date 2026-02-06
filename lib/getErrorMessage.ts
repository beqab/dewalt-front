import type { ApiErrorResponse } from "@/lib/apiClient";

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!value || typeof value !== "object") return false;

  const v = value as Record<string, unknown>;
  return typeof v.statusCode === "number" && typeof v.message === "string";
}

function getFirstFieldError(errors: ApiErrorResponse["errors"]): string | null {
  if (!errors) return null;

  for (const messages of Object.values(errors)) {
    if (
      Array.isArray(messages) &&
      typeof messages[0] === "string" &&
      messages[0]
    )
      return messages[0];
  }

  return null;
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "string" && error.trim()) return error;

  if (isApiErrorResponse(error)) {
    return getFirstFieldError(error.errors) || error.message || fallback;
  }

  if (error instanceof Error) return error.message || fallback;

  return fallback;
}
