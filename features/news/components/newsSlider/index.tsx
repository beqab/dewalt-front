import Carusel from "@/components/carousel";
import NewsCard from "../newsCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getLatestNews } from "../../server/getNews";
import { transformNewsApiToNews } from "../../utils/transformNews";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NewsSlider() {
  const locale = (await getLocale()) as "ka" | "en";
  const apiNews = await getLatestNews(6);
  const t = await getTranslations();
  const news = apiNews.map((item) => transformNewsApiToNews(item, locale));

  return (
    <div className="relative mx-auto mt-18 mb-10 w-full max-w-[1300px] pr-[15px] pl-2 md:mb-18 md:px-[15px] md:py-[15px]">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between px-2 md:px-0">
        <h2 className="font-bpg-web-002-caps text-dark-secondary-100 text-2xl md:text-2xl">
          {t("news.title")}
        </h2>
      </div>

      {news.length > 0 ? (
        <>
          <Carusel>
            {news.map((newsItem) => (
              <NewsCard
                key={newsItem._id}
                news={newsItem}
                className="min-w-0 flex-[0_0_calc(66.666%-0.5rem)] px-2 md:flex-[0_0_calc(33.333%)] md:p-3"
              />
            ))}
          </Carusel>

          <div className="end flex justify-end md:mt-3">
            <Button variant="outline" asChild>
              <Link href="/news">{t("news.viewAll")}</Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center py-10">
          <p className="text-text-secondary">{t("news.notFound")}</p>
        </div>
      )}
    </div>
  );
}
