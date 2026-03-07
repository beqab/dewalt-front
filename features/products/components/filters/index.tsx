"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PriceRange from "@/components/ui/priceRange";
import type { BrandApi } from "@/features/categories/server/getBrands";
import { useTranslations } from "next-intl";
import BrandFilter from "./brandFilter";
import { useDebounce } from "@/hooks/useDebounce";

interface FiltersProps {
  children?: React.ReactNode;
  brands: BrandApi[];
  initialFilters?: {
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function Filters({
  children,
  brands,
  initialFilters,
}: FiltersProps) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const defaultMinPrice = 0;
  const defaultMaxPrice = 20000;

  // Initialize price range from URL or defaults
  const initialMinPrice = initialFilters?.minPrice
    ? parseFloat(initialFilters.minPrice)
    : defaultMinPrice;
  const initialMaxPrice = initialFilters?.maxPrice
    ? parseFloat(initialFilters.maxPrice)
    : defaultMaxPrice;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    isNaN(initialMinPrice) ? defaultMinPrice : initialMinPrice,
    isNaN(initialMaxPrice) ? defaultMaxPrice : initialMaxPrice,
  ]);

  const isUserUpdateRef = useRef(false);

  const debouncedPriceRange = useDebounce(priceRange, 250);

  const handlePriceChange = (values: [number, number]) => {
    // Optimistic update - update UI immediately
    isUserUpdateRef.current = true;
    setPriceRange(values);
  };

  // Sync price range with URL when it changes externally (e.g., removing filter)
  useEffect(() => {
    if (isUserUpdateRef.current) {
      isUserUpdateRef.current = false;
      return;
    }

    const minParam = searchParams.get("minPrice");
    const maxParam = searchParams.get("maxPrice");
    const nextMin = minParam ? parseFloat(minParam) : defaultMinPrice;
    const nextMax = maxParam ? parseFloat(maxParam) : defaultMaxPrice;
    const safeMin = Number.isFinite(nextMin) ? nextMin : defaultMinPrice;
    const safeMax = Number.isFinite(nextMax) ? nextMax : defaultMaxPrice;

    setPriceRange((prev) =>
      prev[0] === safeMin && prev[1] === safeMax ? prev : [safeMin, safeMax]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  // Debounced URL update to avoid spamming route changes while dragging.
  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      const [minPrice, maxPrice] = debouncedPriceRange;
      const isDefaultRange =
        minPrice === defaultMinPrice && maxPrice === defaultMaxPrice;

      if (isDefaultRange) {
        if (!params.has("minPrice") && !params.has("maxPrice")) return;
        params.delete("minPrice");
        params.delete("maxPrice");
      } else {
        const minStr = minPrice.toString();
        const maxStr = maxPrice.toString();
        if (
          params.get("minPrice") === minStr &&
          params.get("maxPrice") === maxStr
        ) {
          return;
        }
        params.set("minPrice", minStr);
        params.set("maxPrice", maxStr);
      }
      params.delete("page"); // Reset to page 1 when filter changes
      router.replace(`?${params.toString()}`, { scroll: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceRange[0], debouncedPriceRange[1]]);

  return (
    <div className="w-full shrink-0 md:w-56">
      <div className="space-y-6 border-[#D2D2D2] md:mr-0 md:border-r md:pr-6">
        {/* Price Filter */}
        <div>
          <h3 className="text-text-secondary mb-6 text-sm">
            {t("filters.priceFilter", { defaultValue: "Filter by Price" })}
          </h3>
          <PriceRange values={priceRange} onChange={handlePriceChange} />
        </div>

        {/* Manufacturers Filter */}
        <BrandFilter
          brands={brands}
          initialBrandParam={initialFilters?.brand}
        />

        {/* Promotional Banners */}
      </div>
      <div className="hidden space-y-4 pr-6 md:block">
        <div className="bg-background-secondary relative mt-18 overflow-hidden rounded-lg">
          <div className="relative w-full cursor-pointer">{children}</div>
        </div>
      </div>
    </div>
  );
}
