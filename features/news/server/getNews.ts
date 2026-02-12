/**
 * Server-side function to fetch news
 * Uses Next.js fetch request deduplication automatically
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import { PaginatedNewsResponse, NewsApi } from "../types/api";
import { CACHE_TAGS } from "@/lib/cacheTags";
import { devLogger } from "@/lib/devLogger";
import { getLocale } from "next-intl/server";

/**
 * Fetches paginated news
 * Next.js automatically deduplicates identical fetch requests
 */
export async function getNews(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedNewsResponse> {
  try {
    const locale = (await getLocale()) as "ka" | "en";
    return await fetchApi<PaginatedNewsResponse>(API_ROUTES.NEWS_PUBLIC, {
      params: {
        page: page.toString(),
        limit: limit.toString(),
      },
      revalidate: 60 * 60 * 24, // 1 day
      tags: [...CACHE_TAGS.news.all],
      headers: {
        "x-custom-lang": locale,
      },
    });
  } catch (error) {
    devLogger.log("Failed to fetch news on server:", error);

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
    const locale = (await getLocale()) as "ka" | "en";
    return await fetchApi<NewsApi>(API_ROUTES.NEWS_PUBLIC, {
      id,
      revalidate: 60 * 60 * 24, // 1 day
      tags: [...CACHE_TAGS.news.all],
      headers: {
        "x-custom-lang": locale,
      },
    });
  } catch (error) {
    // In production, consider logging to a monitoring service
    devLogger.log(`Failed to fetch news by ID (${id}) on server:`, error);
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
    devLogger.log("Failed to fetch latest news on server:", error);

    return [];
  }
}
