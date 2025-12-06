"use client";

import Carusel from "@/components/carousel";
import NewsCard from "../newsCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { dummyNews } from "../../data/dummyNews";

export default function NewsSlider() {
  return (
    <div className="relative mx-auto mt-18 mb-10 w-full max-w-[1300px] pr-[15px] pl-2 md:mb-18 md:px-[15px] md:py-[15px]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-2 md:px-0">
        <h2 className="font-bpg-web-002-caps text-dark-secondary-100 text-2xl md:text-2xl">
          სიახლეები
        </h2>
      </div>

      <Carusel>
        {dummyNews.slice(0, 6).map((news) => (
          <NewsCard
            key={news.id}
            news={news}
            className="min-w-0 flex-[0_0_calc(66.666%-0.5rem)] px-2 md:flex-[0_0_calc(33.333%)] md:p-3"
          />
        ))}
      </Carusel>

      <div className="end flex justify-end md:mt-3">
        <Button variant="outline" asChild>
          <Link href="/news">სრულად</Link>
        </Button>
      </div>
    </div>
  );
}
