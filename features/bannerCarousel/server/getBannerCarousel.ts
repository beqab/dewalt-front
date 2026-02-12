/**
 * Server-side function to fetch banner carousel
 * Uses Next.js fetch request deduplication automatically
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import { BannerCarouselResponse } from "../types";
import { CACHE_TAGS } from "@/lib/cacheTags";

/**
 * Fetches banner carousel data
 * Next.js automatically deduplicates identical fetch requests
 */
export async function getBannerCarousel(): Promise<BannerCarouselResponse> {
  try {
    return await fetchApi<BannerCarouselResponse>(API_ROUTES.BANNER_SLIDER, {
      revalidate: 60 * 60 * 24 * 2, // ISR revalidation every 7 days (60 sec * 60 min * 24 hr * 7 days)
      tags: [...CACHE_TAGS.bannerCarousel.all],
    });
  } catch (error) {
    console.error("Failed to fetch banner carousel on server:", error);

    // Return empty structure instead of throwing to prevent page crash
    // This allows the page to render with empty banners
    return {
      banners: [],
    };
  }
}
