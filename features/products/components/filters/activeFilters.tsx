"use client";

import CloseIcon from "@/components/icons/closeIcon";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import { MenuBrand } from "@/features/categories/types";

export default function ActiveFilters({ menuData }: { menuData: MenuBrand[] }) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Get active filters from URL
  const activeFilters = useMemo(() => {
    const filters: Array<{
      key: string;
      label: string;
      value: string;
    }> = [];

    // Category filter
    const categorySlug = searchParams.get("category");
    if (categorySlug && menuData) {
      for (const brand of menuData) {
        const category = brand.categories?.find(
          (cat) => cat.slug === categorySlug
        );
        if (category) {
          filters.push({
            key: "category",
            label: category.name,
            value: categorySlug,
          });
          break;
        }
      }
    }

    // Child Category filter
    const childCategorySlug = searchParams.get("childCategory");
    if (childCategorySlug && menuData) {
      for (const brand of menuData) {
        for (const category of brand.categories || []) {
          const childCategory = category.subCategories?.find(
            (sub) => sub.slug === childCategorySlug
          );
          if (childCategory) {
            filters.push({
              key: "childCategory",
              label: childCategory.name,
              value: childCategorySlug,
            });
            break;
          }
        }
        if (filters.some((f) => f.key === "childCategory")) break;
      }
    }

    // Price range filter - show as single filter if different from defaults
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const defaultMinPrice = "0";
    const defaultMaxPrice = "20000";

    const minPriceNum = minPrice ? parseFloat(minPrice) : 0;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : 20000;
    const defaultMinPriceNum = parseFloat(defaultMinPrice);
    const defaultMaxPriceNum = parseFloat(defaultMaxPrice);

    // Only show price filter if it differs from defaults
    if (
      (minPrice && minPriceNum !== defaultMinPriceNum) ||
      (maxPrice && maxPriceNum !== defaultMaxPriceNum)
    ) {
      const minDisplay = minPriceNum.toLocaleString();
      const maxDisplay = maxPriceNum.toLocaleString();
      filters.push({
        key: "priceRange",
        label: `${minDisplay} GEL - ${maxDisplay} GEL`,
        value: `${minPrice || defaultMinPrice}-${maxPrice || defaultMaxPrice}`,
      });
    }

    // Search filter
    const search = searchParams.get("search");
    if (search) {
      filters.push({
        key: "search",
        label: `${t("filters.search", { defaultValue: "Search" })}: ${search}`,
        value: search,
      });
    }

    // In Stock filter
    const inStock = searchParams.get("inStock");
    if (inStock === "true" || inStock === "1") {
      filters.push({
        key: "inStock",
        label: t("filters.inStock", { defaultValue: "In Stock" }),
        value: "true",
      });
    }

    return filters;
  }, [searchParams, menuData, t]);

  // Remove a specific filter
  const removeFilter = (filterKey: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (filterKey === "priceRange") {
        // Remove both minPrice and maxPrice
        params.delete("minPrice");
        params.delete("maxPrice");
      } else {
        params.delete(filterKey);
      }

      params.delete("page"); // Reset to page 1 when filter changes
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  // Don't show component if there are no filter labels
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Active Filter Labels */}
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.key}-${index}`}
            className="bg-background-secondary text-dark-secondary-100 flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm"
          >
            <span>{filter.label}</span>
            <button
              type="button"
              onClick={() => removeFilter(filter.key)}
              className="text-text-secondary hover:text-dark-secondary-100 text-sm transition-colors"
              aria-label="Remove filter"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
