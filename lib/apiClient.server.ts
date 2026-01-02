/**
 * Server-side utility functions for SSR data fetching
 * Simple utilities for Next.js server components
 * Uses Next.js fetch request deduplication automatically
 */

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export const API_CONFIG = {
  development: "http://localhost:3000/",
  production: process.env.NEXT_PUBLIC_API_URL,
} as const;

type QueryParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Gets the API base URL based on environment
 */
export function getApiBaseUrl(): string {
  return process.env.NODE_ENV === "production"
    ? API_CONFIG.production || API_CONFIG.development
    : API_CONFIG.development;
}

/**
 * Builds a full API URL from endpoint and optional params
 */
export function buildApiUrl(
  endpoint: string,
  options?: {
    id?: string;
    params?: QueryParams;
    baseUrl?: string;
  }
): string {
  const baseUrl = options?.baseUrl || getApiBaseUrl();
  const url = new URL(
    options?.id ? `${endpoint}/${options.id}` : endpoint,
    baseUrl
  );

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Handles fetch error responses
 */
async function handleFetchError(response: Response): Promise<ApiErrorResponse> {
  let errorData: ApiErrorResponse;

  try {
    errorData = await response.json();
  } catch {
    errorData = {
      message: response.statusText || "An unexpected error occurred",
      statusCode: response.status,
    };
  }

  return errorData;
}

/**
 * Fetches data from API with error handling
 * Next.js automatically deduplicates identical fetch requests
 *
 * @param endpoint - API endpoint path (e.g., "/banner-slider")
 * @param options - Optional configuration
 * @returns Parsed JSON response
 * @throws ApiErrorResponse on error
 *
 * @example
 * ```ts
 * const data = await fetchApi<BannerResponse>("/banner-slider", {
 *   revalidate: 60, // ISR revalidation
 * });
 * ```
 */
export async function fetchApi<TResponse = unknown>(
  endpoint: string,
  options?: {
    id?: string;
    params?: QueryParams;
    baseUrl?: string;
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown;
    headers?: HeadersInit;
    revalidate?: number | false; // ISR revalidation in seconds
    tags?: string[]; // Cache tags for on-demand revalidation
  }
): Promise<TResponse> {
  try {
    const url = buildApiUrl(endpoint, {
      id: options?.id,
      params: options?.params,
      baseUrl: options?.baseUrl,
    });

    const fetchOptions: RequestInit = {
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    };

    // Add body for POST/PATCH requests
    if (
      options?.body &&
      (options.method === "POST" || options.method === "PATCH")
    ) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    // Next.js fetch options for caching/revalidation
    const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
    if (options?.revalidate !== undefined) {
      nextOptions.revalidate = options.revalidate;
    }
    if (options?.tags) {
      nextOptions.tags = options.tags;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    });

    if (!response.ok) {
      const error = await handleFetchError(response);
      throw error;
    }

    return await response.json();
  } catch (error) {
    // Re-throw if it's already an ApiErrorResponse
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    // Wrap unknown errors
    throw {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      statusCode: 500,
    } as ApiErrorResponse;
  }
}
