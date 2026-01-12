/**
 * Server-side function to fetch products
 * Uses Next.js fetch request deduplication automatically
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import { PaginatedProductsResponse } from "../types/api";
import { Product } from "../types";

/**
 * Fetches paginated products
 * Next.js automatically deduplicates identical fetch requests
 */
export async function getProducts(
  page: number = 1,
  limit: number = 10,
  filters?: {
    brandSlug?: string; // Can be comma-separated for multiple brands
    categorySlug?: string;
    childCategorySlug?: string;
    brandId?: string;
    categoryId?: string;
    childCategoryId?: string;
    inStock?: boolean;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    language?: "ka" | "en";
  }
): Promise<PaginatedProductsResponse> {
  try {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (filters?.brandSlug) params.brandSlug = filters.brandSlug;
    if (filters?.categorySlug) params.categorySlug = filters.categorySlug;
    if (filters?.childCategorySlug)
      params.childCategorySlug = filters.childCategorySlug;
    if (filters?.brandId) params.brandId = filters.brandId;
    if (filters?.categoryId) params.categoryId = filters.categoryId;
    if (filters?.childCategoryId)
      params.childCategoryId = filters.childCategoryId;
    if (filters?.inStock !== undefined)
      params.inStock = filters.inStock.toString();
    if (filters?.minPrice !== undefined)
      params.minPrice = filters.minPrice.toString();
    if (filters?.maxPrice !== undefined)
      params.maxPrice = filters.maxPrice.toString();
    if (filters?.search) params.search = filters.search;
    if (filters?.language) params.language = filters.language;

    return await fetchApi<PaginatedProductsResponse>(API_ROUTES.PRODUCTS, {
      params,
      revalidate: 60, // ISR revalidation every 60 seconds
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch products on server:", error);
    }
    return {
      data: [],
      page: 1,
      limit,
      total: 0,
      totalPages: 0,
    };
  }
}

/**
 * Fetches a single product by ID
 */
export async function getProductById(
  id: string,
  language?: "ka" | "en"
): Promise<Product | null> {
  try {
    const params: Record<string, string> = {};
    if (language) params.language = language;

    return await fetchApi<Product>(`${API_ROUTES.PRODUCTS}`, {
      id,
      params,
      revalidate: 60, // ISR revalidation every 60 seconds
    });
  } catch (error) {
    // Handle 404 specifically - product not found is not an error, just return null
    if (error && typeof error === "object" && "statusCode" in error) {
      const apiError = error as { statusCode: number; message: string };
      if (apiError.statusCode === 404) {
        return null;
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.error(`Failed to fetch product by ID (${id}) on server:`, error);
    }
    return null;
  }
}

/**
 * Fetches a single product by slug
 */
export async function getProductBySlug(
  slug: string,
  language?: "ka" | "en"
): Promise<Product | null> {
  try {
    const params: Record<string, string> = {};
    if (language) params.language = language;

    return await fetchApi<Product>(API_ROUTES.PRODUCTS, {
      id: `slug/${slug}`,
      params,
      revalidate: 60, // ISR revalidation every 60 seconds
    });
  } catch (error) {
    // Handle 404 specifically - product not found is not an error, just return null
    if (error && typeof error === "object" && "statusCode" in error) {
      const apiError = error as { statusCode: number; message: string };
      if (apiError.statusCode === 404) {
        return null;
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.error(
        `Failed to fetch product by slug (${slug}) on server:`,
        error
      );
    }
    return null;
  }
}

/**
 * Fetches latest products (for homepage or featured products)
 */
export async function getLatestProducts(
  limit: number = 6,
  language?: "ka" | "en"
): Promise<Product[]> {
  try {
    const response = await getProducts(1, limit, { language });
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch latest products on server:", error);
    }
    return [];
  }
}

/**
 * Fetches similar products based on sub-category, category, or similar name
 */
export async function getSimilarProducts(
  productId: string,
  language?: "ka" | "en"
): Promise<Product[]> {
  try {
    const params: Record<string, string> = {};
    if (language) params.language = language;

    return await fetchApi<Product[]>(API_ROUTES.PRODUCTS, {
      id: `${productId}/similar`,
      params,
      revalidate: 60, // ISR revalidation every 60 seconds
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `Failed to fetch similar products for product (${productId}) on server:`,
        error
      );
    }
    return [];
  }
}
