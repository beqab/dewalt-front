/**
 * Server-side function to fetch brands
 * Uses Next.js fetch request deduplication automatically
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import { devLogger } from "@/lib/devLogger";
import { CACHE_TAGS } from "@/lib/cacheTags";

export interface BrandApi {
  _id: string;
  name: string;
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
    const lang = language || "ka";
    const params: Record<string, string> = {};
    devLogger.log(lang, "language++");

    return await fetchApi<BrandApi[]>(`${API_ROUTES.CATEGORIES}/brands`, {
      params,
      revalidate: 60 * 60 * 24 * 24, // ISR revalidation every 30 days
      tags: [...CACHE_TAGS.menu.all],
      headers: {
        "x-custom-lang": lang,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Failed to fetch brands on server:", error);
    }
    return [];
  }
}
