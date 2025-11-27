"use client";

import Carusel from "@/components/carusel";
import NewsCard from "../newsCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface News {
  id: number;
  image: string;
  name: string;
  date: string;
  description: string;
}

const news: News[] = [
  {
    id: 1,
    image: "/imgs/ad.jpg",
    name: "DEWALT XR ® POWERSTACK ახალი თაობის ბატარეები.",
    date: "2025-01-01",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
  },
  {
    id: 2,
    image: "/imgs/ad.jpg",
    name: "DEWALT XR ® POWERSTACK ახალი თაობის ბატარეები.",
    date: "2025-01-01",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
  },
  {
    id: 3,
    image: "/imgs/ad.jpg",
    name: "DEWALT XR ® POWERSTACK ახალი თაობის ბატარეები.",
    date: "2025-01-01",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
  },
  {
    id: 4,
    image: "/imgs/ad.jpg",
    name: "DEWALT XR ® POWERSTACK ახალი თაობის ბატარეები.",
    date: "2025-01-01",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
  },
  {
    id: 5,
    image: "/imgs/ad.jpg",
    name: "DEWALT XR ® POWERSTACK ახალი თაობის ბატარეები.",
    date: "2025-01-01",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
  },
  {
    id: 6,
    image: "/imgs/ad.jpg",
    name: "DEWALT XR ® POWERSTACK ახალი თაობის ბატარეები.",
    date: "2025-01-01",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
  },
];

export default function NewsSlider() {
  return (
    <div className="customContiner relative mt-18 w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-5 md:px-0">
        <h2 className="font-bpg-web-002-caps text-dark-secundary-100 text-xl md:text-2xl">
          სიახლეები
        </h2>
      </div>

      <Carusel>
        {news.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </Carusel>

      <div className="end mt-3 flex justify-end">
        <Button variant="outline" asChild>
          <Link href="/products">ყველას ნახვა</Link>
        </Button>
      </div>
    </div>
  );
}
