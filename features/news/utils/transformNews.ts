import { NewsApi } from "../types/api";
import { News } from "../types";
import { formatNewsDate } from "./formatDate";
import { generateHybridSlug } from "./slugify";

/**
 * Transforms API news to frontend news format
 */
export function transformNewsApiToNews(
  apiNews: NewsApi,
  locale: "ka" | "en" = "ka"
): News {
  const title = apiNews.title[locale] || apiNews.title.ka || "";

  return {
    _id: apiNews._id,
    slug: generateHybridSlug(title, apiNews._id),
    image: apiNews.imageUrl,
    name: title,
    date: formatNewsDate(apiNews.createdAt, locale),
    description: apiNews.summary[locale] || apiNews.summary.ka || "",
    fullContent: apiNews.content[locale] || apiNews.content.ka || "",
  };
}
