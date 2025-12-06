import { DateIcon } from "@/components/icons/date";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { News } from "../types";

interface NewsCardProps {
  news: News;
  className?: string;
}

export default function NewsCard({ news, className }: NewsCardProps) {
  const { image, name, date, description, id } = news;
  return (
    <div className={cn("relative h-full", className)}>
      <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-[#EEE] p-4 shadow-sm transition-shadow hover:shadow-md">
        {/* News Image */}
        <div className="relative mb-3 aspect-368/272 w-full overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* News Info */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-dark-secondary-100 mb-2 min-h-12 text-sm md:mb-4 md:text-base">
            {name}
          </h3>
          <div className="mb-4 flex items-center gap-2">
            <DateIcon />
            <span className="text-text-secondary text-xs">{date}</span>
          </div>
          <p className="text-text-secondary mb-4 line-clamp-3 flex-1 text-sm">
            {description}
          </p>
        </div>
        <Button variant="dark" className="mt-auto" asChild>
          <Link href={`/news/${id}`}>სრულად</Link>
        </Button>
      </div>
    </div>
  );
}
