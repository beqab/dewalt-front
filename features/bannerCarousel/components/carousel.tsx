"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import classNames from "classnames";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BannerCarouselResponse } from "../types";
import { isExternalUrl } from "@/lib/utils/isExternalUrl";

export default function BannerCarousel({
  bannerCarouselResponse,
  locale,
}: {
  locale: "ka" | "en";
  bannerCarouselResponse: BannerCarouselResponse;
}) {
  const t = useTranslations();
  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set()
  );

  // Memoize slider transformation to avoid recalculating on every render
  const slider = useMemo(
    () =>
      bannerCarouselResponse.banners.map((banner) => ({
        id: banner._id,
        image: banner.imageUrl,
        title: banner.title[locale] || banner.title.ka || "",
        subtitle: banner.description[locale] || banner.description.ka || "",
        buttonLink: banner.buttonLink,
      })),
    [bannerCarouselResponse.banners, locale]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="relative mt-16 aspect-60/40 w-full overflow-hidden md:mt-0 md:aspect-3/1">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slider.length === 0 ? (
            <div className="relative flex h-full min-w-0 flex-[0_0_100%] items-center justify-center">
              <p className="text-lg text-white">No banners available</p>
            </div>
          ) : (
            slider.map((slide, index) => (
              <div
                key={slide.id}
                className="relative h-full min-w-0 flex-[0_0_100%]"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {!failedImages.has(slide.id) ? (
                    <Image
                      src={slide.image}
                      alt={slide.title || "Banner"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="100vw"
                      style={{ height: "100%" }}
                      onError={() => {
                        setFailedImages((prev) => {
                          const next = new Set(prev);
                          next.add(slide.id);
                          return next;
                        });
                      }}
                    />
                  ) : (
                    <div className="from-dark-secondary-100 to-dark-secondary-100/70 absolute inset-0 bg-linear-to-br" />
                  )}
                  {/* Overlay for better text readability */}
                  <div className="from-dark-secondary-100/70 to-dark-secondary-100/30 absolute inset-0 bg-linear-to-br" />
                </div>

                {/* Content Overlay */}
                <div className="font-inter relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
                  <div className="space-y-4">
                    <div>
                      <h1 className="font-bpg-web-002-caps text-3xl leading-relaxed font-bold text-white md:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl leading-relaxed font-semibold text-white md:text-4xl lg:text-3xl">
                        {slide.subtitle}
                      </h2>
                    </div>
                    {slide.buttonLink &&
                      (isExternalUrl(slide.buttonLink) ? (
                        <a
                          href={slide.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary text-dark-secondary-100 hover:bg-primary/90 mt-2 inline-block rounded-sm px-8 py-2 text-sm transition-all hover:scale-102 md:w-[200px] md:px-12 md:py-3 md:text-xl"
                        >
                          {t("common.viewAll")}
                        </a>
                      ) : (
                        <Link
                          href={slide.buttonLink}
                          className="bg-primary text-dark-secondary-100 hover:bg-primary/90 mt-2 inline-block rounded-sm px-8 py-2 text-sm transition-all hover:scale-102 md:w-[200px] md:px-12 md:py-3 md:text-xl"
                        >
                          {t("common.viewAll")}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Dots */}
      {slider.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slider.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => scrollTo(index)}
              className={classNames(
                "h-3 w-3 rounded-full transition-all duration-300",
                {
                  "bg-primary w-8": index === selectedIndex,
                  "bg-line-color hover:bg-line-color/70":
                    index !== selectedIndex,
                }
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
