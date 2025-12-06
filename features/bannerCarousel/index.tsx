"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import classNames from "classnames";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export default function BannerCarousel() {
  const t = useTranslations();

  const slides: Slide[] = [
    {
      id: 1,
      image: "/imgs/banner.png",
      title: t("banner.newYearSale"),
      subtitle: t("banner.discount"),
      buttonText: t("banner.viewAll"),
      buttonLink: "/products",
    },
    {
      id: 2,
      image: "/imgs/banner.png",
      title: t("banner.newCollection"),
      subtitle: t("banner.professionalTools"),
      buttonText: t("banner.viewAll"),
      buttonLink: "/products",
    },
    {
      id: 3,
      image: "/imgs/banner.png",
      title: t("banner.specialOffer"),
      subtitle: t("banner.bigDiscounts"),
      buttonText: t("banner.viewAll"),
      buttonLink: "/products",
    },
  ];
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
    <div className="relative mt-16 aspect-39/40 w-full overflow-hidden md:mt-0 md:aspect-3/1">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                  sizes="100vw"
                  style={{ height: "100%" }}
                  onError={(e) => {
                    // Fallback to a gradient background if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Overlay for better text readability */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary-100/80 to-dark-secondary-100/60" /> */}
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
                  <a
                    href={slide.buttonLink}
                    className="bg-primary text-dark-secondary-100 hover:bg-primary/90 mt-2 inline-block rounded-sm px-8 py-2 text-sm transition-all hover:scale-102 md:w-[200px] md:px-12 md:py-3 md:text-xl"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            className={classNames(
              "h-3 w-3 rounded-full transition-all duration-300",
              {
                "bg-primary w-8": index === selectedIndex,
                "bg-line-color hover:bg-line-color/70": index !== selectedIndex,
              }
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
