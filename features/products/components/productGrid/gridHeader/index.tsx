"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function GridHeader({
  productsCount,
}: {
  productsCount: number;
}) {
  const t = useTranslations();
  const [sortBy, setSortBy] = useState("price-desc");

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <label
          htmlFor="sort"
          className="text-text-secondary text-sm font-medium"
        >
          {t("products.sortBy")}
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortBy}
          className="text-dark-secondary-100 focus:ring-primary rounded border border-transparent bg-white px-3 text-sm focus:ring-2 focus:outline-none"
        >
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
