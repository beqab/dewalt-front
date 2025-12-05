"use client";

import NewsGrid from "@/features/news/components/newsGrid";
import { dummyNews } from "@/features/news/data/dummyNews";
import Breadcrumb from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";

export default function NewsPage() {
  const t = useTranslations();

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.news") },
  ];
  return (
    <div className="bg-neutral min-h-screen py-10 pt-0 md:bg-white">
      <Breadcrumb items={breadcrumbItems} />
      <div className="customContainer">
        <div className="mb-6"></div>
        <NewsGrid news={dummyNews} />
      </div>
    </div>
  );
}
