"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import classNames from "classnames";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/imgs/banner.png", // You'll need to add this image
    title: "საახალწლო",
    subtitle: "ფასდაკლება",
    buttonText: "სრულად",
    buttonLink: "/products",
  },
  {
    id: 2,
    image: "/imgs/banner.png", // You'll need to add this image
    title: "ახალი კოლექცია",
    subtitle: "პროფესიონალური ხელსაწყოები",
    buttonText: "სრულად",
    buttonLink: "/products",
  },
  {
    id: 3,
    image: "/imgs/banner.png", // You'll need to add this image
    title: "სპეციალური შეთავაზება",
    subtitle: "დიდი ფასდაკლებები",
    buttonText: "სრულად",
    buttonLink: "/products",
  },
];

export default function BannerCarusel() {
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
    <div className="relative w-full aspect-39/40  md:aspect-3/1  overflow-hidden mt-16 md:mt-0">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%] h-full"
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
                {/* <div className="absolute inset-0 bg-gradient-to-br from-dark-secundary-100/80 to-dark-secundary-100/60" /> */}
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 flex h-full flex-col items-center font-inter     justify-center px-5 text-center">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl font-semibold text-white md:text-4xl lg:text-3xl">
                      {slide.subtitle}
                    </h2>
                  </div>
                  <a
                    href={slide.buttonLink}
                    className="mt-2 inline-block rounded-sm bg-primary px-8 py-2 text-sm  text-dark-secundary-100 transition-all hover:bg-primary/90 hover:scale-102 md:px-12 md:py-3 md:text-xl md:w-[200px]"
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
