import { NewsApi } from "../types/api";
import { News } from "../types";
import { formatNewsDate } from "./formatDate";

/**
 * Transforms API news to frontend news format
 */
export function transformNewsApiToNews(
  apiNews: NewsApi,
  locale: "ka" | "en" = "ka"
): News {
  return {
    _id: apiNews._id,
    image: apiNews.imageUrl,
    name: apiNews.title[locale] || apiNews.title.ka || "",
    date: formatNewsDate(apiNews.createdAt, locale),
    description: apiNews.summary[locale] || apiNews.summary.ka || "",
    fullContent: apiNews.content[locale] || apiNews.content.ka || "",
  };
}
