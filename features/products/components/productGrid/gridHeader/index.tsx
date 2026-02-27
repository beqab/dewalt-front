"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

export default function GridHeader({
  productsCount,
}: {
  productsCount: number;
}) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const sortBy = searchParams.get("sort") || "";

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "" || value === "default") {
        // Default/placeholder option, remove from URL
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
      params.delete("page"); // Reset to page 1 when sort changes
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortBy}
          className="text-dark-secondary-100 focus:ring-primary border-line-transparent h-8 max-w-[150px] rounded rounded-b-sm border border-transparent bg-white px-3 text-sm focus:ring-2 focus:outline-none"
        >
          <option value="">{t("products.sortBy")}</option>
          <option value="price-desc">{t("products.priceDesc")}</option>
          <option value="price-asc">{t("products.priceAsc")}</option>
        </select>
      </div>

      <div className="text-dark-secondary-100 text-sm">
        <span className="text-text-secondary"> {t("products.found")} </span>{" "}
        {productsCount} {t("products.products")}
      </div>
    </div>
  );
}
