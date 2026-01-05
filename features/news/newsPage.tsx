import NewsGrid from "@/features/news/components/newsGrid";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getTranslations } from "next-intl/server";
import { getNews } from "./server/getNews";
import { transformNewsApiToNews } from "./utils/transformNews";
import { getLocale } from "next-intl/server";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations();
  const locale = (await getLocale()) as "ka" | "en";
  const params = await searchParams;
  
  // Validate and sanitize page number
  const rawPage = parseInt(params.page || "1", 10);
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.news") },
  ];

  const newsResponse = await getNews(currentPage, 9);
  const news = newsResponse.data.map((item) =>
    transformNewsApiToNews(item, locale)
  );

  return (
    <div className="bg-neutral min-h-screen py-10 pt-0 md:bg-white">
      <Breadcrumb items={breadcrumbItems} />
      <div className="customContainer">
        <div className="mb-6"></div>
        <NewsGrid
          news={news}
          pagination={{
            currentPage: newsResponse.page,
            totalPages: newsResponse.totalPages,
            total: newsResponse.total,
          }}
        />
      </div>
    </div>
  );
}
