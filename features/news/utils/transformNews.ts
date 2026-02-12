import { NewsApi } from "../types/api";
import { News } from "../types";
import { formatNewsDate } from "./formatDate";
import { generateSlug } from "../../../lib/utils/slugify";

/**
 * Transforms API news to frontend news format
 */
export function transformNewsApiToNews(
  apiNews: NewsApi,
  locale: "ka" | "en" = "ka"
): News {
  const title = apiNews.title || "";

  return {
    _id: apiNews._id,
    slug: generateSlug(title, apiNews._id),
    image: apiNews.imageUrl,
    name: title,
    date: formatNewsDate(apiNews.createdAt, locale),
    description: apiNews.summary || "",
    fullContent: apiNews.content || "",
  };
}
