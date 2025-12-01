import CompactNewsCard from "../compactNewsCard";
import type { News } from "../../types";

interface RecentlyAddedNewsProps {
  news: News[];
  currentNewsId?: number;
}

export default function RecentlyAddedNews({
  news,
  currentNewsId,
}: RecentlyAddedNewsProps) {
  // Filter out current news and get first 4
  const recentNews = news
    .filter((item) => item.id !== currentNewsId)
    .slice(0, 4);

  if (recentNews.length === 0) return null;

  return (
    <div className="w-full md:w-[390px]">
      <h3 className="text-dark-secondary-100 mb-4 md:mb-6">
        ბოლოს დამატებული სიახლეები
      </h3>
      <div className="space-y-4">
        {recentNews.map((item) => (
          <CompactNewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}
