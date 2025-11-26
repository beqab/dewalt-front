"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import classNames from "classnames";
import CompearIcon from "@/components/icons/compearIcon";
import FbMessenger from "@/public/icons/fbmessenger.svg";
import ProductCard from "../productCard";

interface Product {
  id: number;
  image: string;
  name: string;
  code: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DWP849k",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
    price: 1290,
    originalPrice: 1830,
    discount: 23,
    inStock: true,
  },
  {
    id: 2,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DEW-86511 55",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
    price: 1950,
    originalPrice: 2360,
    discount: 23,
    inStock: true,
  },
  {
    id: 3,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DWP849k",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
    price: 1290,
    originalPrice: 1830,
    discount: 23,
    inStock: true,
  },
  {
    id: 4,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DEW-86511 55",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
    price: 1950,
    originalPrice: 2360,
    discount: 23,
    inStock: true,
  },
  {
    id: 5,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DWP849k",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
    price: 1290,
    originalPrice: 1830,
    discount: 23,
    inStock: true,
  },
  {
    id: 6,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DEW-86511 55",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
    price: 1950,
    originalPrice: 2360,
    discount: 23,
    inStock: true,
  },
];

export default function ProductSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Initial state check
    const checkState = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    // Use requestAnimationFrame to avoid synchronous setState
    requestAnimationFrame(checkState);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full container mx-auto mt-18">
      {/* Header */}
      <div className="mb-4 flex  items-center justify-between px-5 md:px-0">
        <h2 className="text-xl font-bpg-web-002-caps  text-dark-secundary-100 md:text-2xl">
          პროდუქტები
        </h2>
        <div className="flex items-end gap-6">
          <button
            type="button"
            className="flex h-10  items-center gap-2 rounded-sm bg-primary px-3 py-2 text-xs font-medium text-dark-secundary-100 transition-colors hover:bg-primary/90"
          >
            <CompearIcon />
            შედარება (3)
          </button>
          <button
            type="button"
            aria-label="Messenger"
            className="rounded-lg bg-[#FAFAFA] p-1 shadow-[1px_1px_10.1px_0_rgba(0,0,0,0.25)]"
          >
            <Image src={FbMessenger} alt="heart" className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden px-5 md:px-0" ref={emblaRef}>
          <div className="flex gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className={classNames(
            "absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "opacity-50 cursor-not-allowed": prevBtnDisabled,
            }
          )}
          aria-label="Previous"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className={classNames(
            "absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "opacity-50 cursor-not-allowed": nextBtnDisabled,
            }
          )}
          aria-label="Next"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
