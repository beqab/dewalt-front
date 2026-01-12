"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PriceRange from "@/components/ui/priceRange";
import type { BrandApi } from "@/features/categories/server/getBrands";
import { useTranslations } from "next-intl";
import BrandFilter from "./brandFilter";

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

  // Initialize price range from URL or defaults
  const initialMinPrice = initialFilters?.minPrice
    ? parseFloat(initialFilters.minPrice)
    : 0;
  const initialMaxPrice = initialFilters?.maxPrice
    ? parseFloat(initialFilters.maxPrice)
    : 12983;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    isNaN(initialMinPrice) ? 230 : initialMinPrice,
    isNaN(initialMaxPrice) ? 12983 : initialMaxPrice,
  ]);

  const handlePriceChange = (values: [number, number]) => {
    // Optimistic update - update UI immediately
    setPriceRange(values);

    // Update URL in background (non-blocking)
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("minPrice", values[0].toString());
      params.set("maxPrice", values[1].toString());
      params.delete("page"); // Reset to page 1 when filter changes
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

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
