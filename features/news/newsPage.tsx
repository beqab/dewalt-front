"use client";

import NewsGrid from "@/features/news/components/newsGrid";
import { dummyNews } from "@/features/news/data/dummyNews";
import Breadcrumb from "@/components/ui/breadcrumb";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "სიახლეები" },
];

export default function NewsPage() {
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
