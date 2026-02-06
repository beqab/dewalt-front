import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { devLogger } from "@/lib/devLogger";

export interface ErrorResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

// Add proper error response interface
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export type IApiError = AxiosError<ApiErrorResponse>;

export const API_CONFIG = {
  development: "http://localhost:3000/",
  production: process.env.NEXT_PUBLIC_API_URL,
} as const;

// Create axios instance with environment-based configuration

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? API_CONFIG.production
      : API_CONFIG.development,
  timeout: 100000, // 100 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

export const authHeader = "authorization";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

// Add interceptor to handle authorization tokens
axiosInstance.interceptors.request.use(
  async (config) => {
    // Use next-auth session for authentication
    if (typeof window !== "undefined") {
      const session = await getSession();
      const token = session?.user?.accessToken;
      if (token && typeof token === "string" && config.headers) {
        config.headers[authHeader] = token;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token refresh
// Token refresh is handled by NextAuth JWT callback, so we just sign out on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If error is 401, sign out (NextAuth will handle token refresh automatically)
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const { signOut } = await import("next-auth/react");
      await signOut({ redirect: true, callbackUrl: "/login" });
    }

    return Promise.reject(error);
  }
);

let languageInterceptorId: number | null = null;

export const axiosInterceptorAddLanguage = (lang: string) => {
  devLogger.log(lang, "axiosInterceptorAddLanguage");

  // Remove the previous language interceptor if it exists
  if (languageInterceptorId !== null) {
    axiosInstance.interceptors.request.eject(languageInterceptorId);
  }

  // Add the new interceptor with the updated language
  languageInterceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      if (lang) {
        config.headers["x-custom-lang"] = `${lang}`;
      }

      return config;
    },
    (error) => {
      devLogger.error(error, "Error in language interceptor");
      return Promise.reject(error);
    }
  );
};

class APIClient<TResponse = unknown> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //  get method with optional params and config
  async get<TData = TResponse>(
    params?: Record<string, string | number | boolean | null | undefined>,
    id = "",
    config?: AxiosRequestConfig
  ): Promise<TData> {
    try {
      const url = id ? `${this.endpoint}/${id}` : this.endpoint;
      const response = await axiosInstance.get<TData>(url, {
        params: {
          ...params,
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error as IApiError);
      }
      throw error;
    }
  }

  //  getAll method with pagination support
  async getAll<TData = TResponse[]>(
    page = 1,
    limit = 10,
    params?: Record<string, string | number | boolean | null | undefined>
  ): Promise<ApiResponse<TData>> {
    try {
      const response = await axiosInstance.get<ApiResponse<TData>>(
        this.endpoint,
        {
          params: {
            page,
            limit,
            ...params,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error as IApiError);
      }
      throw error;
    }
  }

  async post<TRequest = unknown, TData = TResponse>(
    data: TRequest,
    config?: AxiosRequestConfig,
    options?: { url?: string }
  ): Promise<TData> {
    try {
      const url = options?.url || this.endpoint;
      const response = await axiosInstance.post<TData>(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error as IApiError);
      }
      throw error;
    }
  }

  //put method
  async put<TRequest = unknown, TData = TResponse>(
    id: string | number = "",
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<TData>> {
    try {
      const response = await axiosInstance.put<ApiResponse<TData>>(
        `${this.endpoint}/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error as IApiError);
      }
      throw error;
    }
  }

  //delete method
  async delete<TData = void>(id: string | number): Promise<ApiResponse<TData>> {
    try {
      const response = await axiosInstance.delete<ApiResponse<TData>>(
        `${this.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error as IApiError);
      }
      throw error;
    }
  }

  //patch method
  async patch<TRequest = unknown, TData = TResponse>(
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<TData>> {
    try {
      const response = await axiosInstance.patch<ApiResponse<TData>>(
        this.endpoint,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error as IApiError);
      }
      throw error;
    }
  }

  //patch method with id
  async patchById<TRequest = unknown, TData = TResponse>(
    id: string | number,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TData> {
    try {
      const response = await axiosInstance.patch<TData>(
        `${this.endpoint}/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error as IApiError);
      }
      throw error;
    }
  }

  // Error handling helper
  private handleApiError(error: IApiError): ApiErrorResponse {
    if (error.response) {
      return error.response.data;
    }

    // Network error or other non-response error - convert to consistent format
    return {
      message: error.message || "An unexpected error occurred",
      statusCode: 500,
    };
  }
}

export default APIClient;

// Usage example:
export const createApiClient = <T>(endpoint: string) =>
  new APIClient<T>(endpoint);
