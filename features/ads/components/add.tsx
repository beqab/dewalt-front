import { Link } from "@/i18n/navigation";
import { isExternalUrl } from "@/lib/utils/isExternalUrl";
import Image from "next/image";
import { Ad } from "../types";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface AdImageProps {
  ad: {
    imageUrl: string;
    urlLink?: string;
  };
  sizes: string;
  priority?: boolean;
  className?: string;
}

function AdImage({ ad, sizes, priority = false, className }: AdImageProps) {
  const image = (
    <Image
      src={ad.imageUrl}
      alt="Advertisement"
      width={0}
      height={0}
      className={cn("h-auto w-full object-contain", className)}
      sizes={sizes}
      priority={priority}
      style={{ width: "100%", height: "auto" }}
    />
  );

  if (!ad.urlLink) {
    return image;
  }

  const isExternal = isExternalUrl(ad.urlLink);

  if (isExternal) {
    return (
      <a
        href={ad.urlLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        {image}
      </a>
    );
  }

  return (
    <Link href={ad.urlLink} className="block w-full">
      {image}
    </Link>
  );
}

export default function Add({ ad, className }: { ad: Ad; className?: string }) {
  const t = useTranslations();
  return (
    <div className="px-3 md:px-0">
      <div
        className={cn(
          "relative mx-auto mt-10 flex w-full max-w-[1270px] justify-between gap-6 overflow-hidden rounded-lg bg-[#D9D9D9] pr-0 pl-0 md:mt-18",
          className
        )}
      >
        {/* First Ad */}
        <div className="w-full overflow-hidden rounded-lg bg-[#D9D9D9]">
          {ad ? (
            <AdImage
              ad={ad}
              sizes="(max-width: 768px) 100vw, 224px"
              priority
              className="rounded-lg"
            />
          ) : (
            <div className="flex min-h-[152px] w-full items-center justify-center md:min-h-[252px]">
              {/* <p className="text-2xl text-gray-500">{t("ads.add")}</p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
