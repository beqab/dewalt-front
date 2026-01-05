import CompactNewsCard from "../compactNewsCard";
import { getLatestNews } from "../../server";
import { transformNewsApiToNews } from "../../utils/transformNews";
import { getLocale, getTranslations } from "next-intl/server";

interface RecentlyAddedNewsProps {
  currentNewsId?: string;
}

export default async function RecentlyAddedNews({
  currentNewsId,
}: RecentlyAddedNewsProps) {
  // Get recently added news (excluding current)
  const latestNewsApi = await getLatestNews(5);
  const locale = (await getLocale()) as "ka" | "en";
  const t = await getTranslations();

  const recentNews = latestNewsApi
    .filter((item) => item._id !== currentNewsId)
    .slice(0, 4)
    .map((item) => transformNewsApiToNews(item, locale));

  if (recentNews.length === 0) return null;

  return (
    <div className="w-full md:w-[390px]">
      <h3 className="text-dark-secondary-100 mb-4 md:mb-6">
        {t("news.recentlyAddedNews")}
      </h3>
      <div className="space-y-4">
        {recentNews.map((item) => (
          <CompactNewsCard key={item._id} news={item} />
        ))}
      </div>
    </div>
  );
}
