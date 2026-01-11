/**
 * Server-side function to fetch brands
 * Uses Next.js fetch request deduplication automatically
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";

export interface BrandApi {
  _id: string;
  name: { ka: string; en: string };
  slug: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetches all brands
 * Next.js automatically deduplicates identical fetch requests
 */
export async function getBrands(language?: "ka" | "en"): Promise<BrandApi[]> {
  try {
    const params: Record<string, string> = {};
    if (language) params.language = language;

    return await fetchApi<BrandApi[]>(`${API_ROUTES.CATEGORIES}/brands`, {
      params,
      revalidate: 60, // ISR revalidation every 60 seconds
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch brands on server:", error);
    }
    return [];
  }
}
