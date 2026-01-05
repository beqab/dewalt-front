"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import NewsCard from "../newsCard";
import Pagination from "@/features/products/components/pagination";
import type { News } from "../../types";

interface NewsGridProps {
  news: News[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    total: number;
  };
}

export default function NewsGrid({ news, pagination }: NewsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const t = useTranslations();
  const locale = params.locale as string;

  const handlePageChange = (page: number) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("page", page.toString());
    router.push(`/${locale}/news?${urlParams.toString()}`);
  };

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-text-secondary text-lg">{t("news.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* News Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item._id} news={item} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
