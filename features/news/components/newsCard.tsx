import { BucketIcon } from "@/components/icons/bucketIcon";
import { DateIcon } from "@/components/icons/date";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface News {
  id: number;
  image: string;
  name: string;
  date: string;
  description: string;
}

export default function NewsCard({ news }: { news: News }) {
  const { image, name, date, description, id } = news;
  return (
    <div
      key={id}
      className="relative min-w-0 flex-[0_0_calc(66.666%-0.5rem)] px-2 md:flex-[0_0_calc(33.333%)] md:p-3"
    >
      <div className="border-line-color relative flex h-full flex-col rounded-lg bg-[#EEE] p-4 shadow-sm transition-shadow hover:shadow-md">
        {/* Product Image */}
        <div className="relative mb-3 aspect-368/272 w-full overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 66.666vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-dark-secondary-100 mb-2 h-12 text-sm font-bold md:mb-4 md:h-14 md:text-base">
            {name}
          </h3>
          <div className="mb-4 flex items-center gap-2">
            <DateIcon />
            <span className="text-text-secondary text-xs"> {date} </span>
          </div>
          <p className="text-text-secondary mb-4 text-sm">{description}</p>
        </div>
        <Button variant="dark">
          <Link href={`/news/${id}`}>სრულად</Link>
        </Button>
      </div>
    </div>
  );
}
