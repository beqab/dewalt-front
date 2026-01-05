import { DateIcon } from "@/components/icons/date";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { News } from "../../types";

interface CompactNewsCardProps {
  news: News;
}

export default function CompactNewsCard({ news }: CompactNewsCardProps) {
  const { image, name, date, _id } = news;
  return (
    <Link
      href={`/news/${_id}`}
      className="group bg-background flex gap-4 rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md md:bg-white"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden md:h-[112px] md:w-[152px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 80px, 152px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-1 py-2">
        <h4 className="text-dark-secondary-100 group-hover:text-primary line-clamp-2 text-sm font-bold transition-colors">
          {name}
        </h4>
        <div className="flex items-center gap-2">
          <DateIcon />
          <span className="text-text-secondary text-xs">{date}</span>
        </div>
      </div>
    </Link>
  );
}
