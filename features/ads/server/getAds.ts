/**
 * Server-side function to fetch ads
 * Uses Next.js fetch request deduplication automatically
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import { Ad, AdsResponse } from "../types";
import { CACHE_TAGS } from "@/lib/cacheTags";

/**
 * Fetches all ads
 * Next.js automatically deduplicates identical fetch requests
 */
export async function getAds(): Promise<AdsResponse> {
  try {
    return await fetchApi<AdsResponse>(API_ROUTES.ADS, {
      revalidate: 60 * 60 * 24, // 1 day
      tags: [...CACHE_TAGS.ads.all],
    });
  } catch (error) {
    console.error("Failed to fetch ads on server:", error);

    // Return empty array instead of throwing to prevent page crash
    // This allows the page to render with no ads
    return [];
  }
}

/**
 * Fetches ads by position
 * @param position - Ad position (main_page, aside, footer)
 */
export async function getAdsByPosition(position: string): Promise<Ad | null> {
  try {
    return await fetchApi<Ad>(API_ROUTES.ADS_BY_POSITION, {
      params: { position },
      revalidate: 60 * 60 * 24, // 1 day
      tags: [...CACHE_TAGS.ads.all],
    });
  } catch (error) {
    console.log(
      `Failed to fetch ads by position (${position}) on server:`,
      error
    );

    return null;
  }
}
