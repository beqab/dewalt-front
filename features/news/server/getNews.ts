/**
 * Server-side function to fetch news
 * Uses Next.js fetch request deduplication automatically
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import { PaginatedNewsResponse, NewsApi } from "../types/api";

/**
 * Fetches paginated news
 * Next.js automatically deduplicates identical fetch requests
 */
export async function getNews(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedNewsResponse> {
  try {
    return await fetchApi<PaginatedNewsResponse>(API_ROUTES.NEWS, {
      params: {
        page: page.toString(),
        limit: limit.toString(),
      },
      revalidate: 60, // ISR revalidation every 60 seconds
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch news on server:", error);
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
 * Fetches a single news article by ID
 */
export async function getNewsById(id: string): Promise<NewsApi | null> {
  try {
    return await fetchApi<NewsApi>(API_ROUTES.NEWS, {
      id,
      revalidate: 60, // ISR revalidation every 60 seconds
    });
  } catch (error) {
    // In production, consider logging to a monitoring service
    if (process.env.NODE_ENV === "development") {
      console.error(`Failed to fetch news by ID (${id}) on server:`, error);
    }
    return null;
  }
}

/**
 * Fetches latest news (for homepage slider)
 */
export async function getLatestNews(limit: number = 6): Promise<NewsApi[]> {
  try {
    const response = await getNews(1, limit);
    return response.data;
  } catch (error) {
    // In production, consider logging to a monitoring service
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to fetch latest news on server:", error);
    }
    return [];
  }
}
