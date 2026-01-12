"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import type { BrandApi } from "@/features/categories/server/getBrands";
import { useTranslations } from "next-intl";
import { useGetLocale } from "@/lib/utils/useGetLocale";
import { cn } from "@/lib/utils";

interface BrandFilterProps {
  brands: BrandApi[];
  initialBrandParam?: string;
}

export default function BrandFilter({
  brands,
  initialBrandParam,
}: BrandFilterProps) {
  const t = useTranslations();
  const locale = useGetLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get selected brand slugs from URL (can be multiple)
  const getSelectedBrandSlugs = (): string[] => {
    const brandParam = initialBrandParam || searchParams.get("brand");
    if (!brandParam) return [];
    // Support both comma-separated and array format
    return brandParam.split(",").filter(Boolean);
  };

  // Get initial brands from URL
  const urlBrands = getSelectedBrandSlugs();

  // Optimistic state for selected brands - updates immediately on user interaction
  const [optimisticBrands, setOptimisticBrands] = useState<string[]>(urlBrands);

  // Track if we're updating from user interaction (to avoid syncing back from URL)
  const isUserUpdateRef = useRef(false);

  // Sync optimistic state with URL when it changes externally (e.g., browser back/forward)
  useEffect(() => {
    // Skip sync if this update came from user interaction
    if (isUserUpdateRef.current) {
      isUserUpdateRef.current = false;
      return;
    }

    const currentUrlBrands = getSelectedBrandSlugs();
    setOptimisticBrands(currentUrlBrands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), initialBrandParam]);

  const handleBrandToggle = (brandSlug: string) => {
    // Mark as user update to prevent sync back from URL
    isUserUpdateRef.current = true;

    // Optimistic update - update UI immediately
    const currentBrands = optimisticBrands;
    let newBrands: string[];
    if (currentBrands.includes(brandSlug)) {
      // Remove brand if already selected
      newBrands = currentBrands.filter((slug) => slug !== brandSlug);
    } else {
      // Add brand if not selected
      newBrands = [...currentBrands, brandSlug];
    }

    // Update optimistic state immediately
    setOptimisticBrands(newBrands);

    // Update URL in background (non-blocking)
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newBrands.length === 0) {
        params.delete("brand");
      } else {
        params.set("brand", newBrands.join(","));
      }
      params.delete("page"); // Reset to page 1 when filter changes
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div>
      <h3 className="text-text-secondary mb-4 text-sm">
        {t("filters.manufacturers", { defaultValue: "Manufacturers" })}
      </h3>
      <div className="space-y-3">
        {brands?.map((brand) => {
          const brandName = brand.name[locale];
          // Use optimistic state for immediate UI feedback
          const isSelected = optimisticBrands.includes(brand.slug);

          return (
            <label
              key={brand._id}
              className={cn(
                "text-dark-secondary-100 flex cursor-pointer items-center gap-2 text-sm transition-opacity",
                isPending && "opacity-70"
              )}
            >
              <Checkbox
                checked={isSelected}
                onChange={() => handleBrandToggle(brand.slug)}
              />
              <span className="text-text-secondary text-sm">{brandName}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
