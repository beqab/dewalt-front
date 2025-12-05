"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/ui/breadcrumb";
import { DateIcon } from "@/components/icons/date";
import RecentlyAddedNews from "./components/recentlyAddedNews";
import { dummyNews } from "./data/dummyNews";
import ShareButton from "@/components/ui/ShareButton";
import { useTranslations } from "next-intl";

export default function NewsDetail() {
  const t = useTranslations();
  const params = useParams();
  const newsId = Number(params?.id || params?.slug || 1);
  const news = dummyNews.find((item) => item.id === newsId) || dummyNews[0];

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.news"), href: "/news" },
    { label: news.name },
  ];

  const fullContent =
    news.fullContent ||
    `ახალი, ინოვაციური ტექნოლოგიით დამზადებული ბატარეები, რომლებიც გამოირჩევიან მაღალი სიმძლავრით და კომპაქტური ზომით. ეს ბატარეები შექმნილია პროფესიონალებისთვის, რომლებიც საჭიროებენ საიმედო და გრძელვადიან მუშაობას ყველა პირობაში. ჩვენი ბატარეები გამოირჩევიან გაუმჯობესებული ტექნოლოგიით, რომელიც უზრუნველყოფს უფრო მეტ სიმძლავრეს და ხანგრძლივობას.`;

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="bg-neutral md:bg-background mb-10 md:mb-18">
        <div className="mx-auto max-w-[1070px] px-[15px] py-8 pt-0 md:pt-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_390px]">
            {/* Main Article */}
            <article className="border-line-color min-w-0 md:border-r md:pr-6">
              {/* Featured Image */}
              <div className="relative mb-4 aspect-636/389 w-full overflow-hidden md:mb-6">
                <Image
                  src={news.image}
                  alt={news.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
              </div>

              {/* Article Header */}
              <div className="mb-4">
                <h1 className="text-dark-secondary-100 font-bpg-web-002-caps mb-4 text-2xl md:text-3xl">
                  {news.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5">
                    <DateIcon />
                    <span className="text-text-secondary text-xs">
                      {news.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="text-text-secondary mb-6 space-y-4 border-b border-[#D2D2D2] pb-4 text-sm leading-relaxed">
                <p>{news.description}</p>
                <p>{fullContent}</p>
              </div>

              {/* Read More Button */}

              <ShareButton />
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:sticky lg:top-8 lg:h-fit">
              <RecentlyAddedNews news={dummyNews} currentNewsId={news.id} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
