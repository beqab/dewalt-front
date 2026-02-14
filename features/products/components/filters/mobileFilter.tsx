"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import FilterIcon from "@/components/icons/filterIcon";
import CloseIcon from "@/components/icons/closeIcon";
import SearchIcon from "@/components/icons/searchIcon";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Button } from "@/components/ui/button";
import Filters from ".";
import { cn } from "@/lib/utils";
import { BrandApi } from "@/features/categories/server/getBrands";

interface MobileFilterProps {
  brands: BrandApi[];
  initialFilters: {
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function MobileFilter({
  brands,
  initialFilters,
}: MobileFilterProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
  };

  useBodyScrollLock(isOpen);
  return (
    <div className="relative z-20 md:hidden">
      <Button variant="dark" className="mb-4 w-full gap-2" onClick={handleOpen}>
        <FilterIcon /> <span>{t("filters.filter")}</span>
      </Button>
      {/* Animated mobile drawer */}
      <div
        onClick={handleClose}
        className={cn(
          "fixed inset-0 top-30 left-0 z-30 flex justify-end bg-black/40 transition-opacity duration-300 ease-out",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={cn(
            "relative h-full w-full max-w-xs translate-x-full bg-white pt-6 pr-4 pb-10 pl-4 shadow-xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseIcon
            onClick={handleClose}
            className="absolute top-4 right-4 min-h-6.5 min-w-6.5 cursor-pointer"
          />
          <Filters brands={brands} initialFilters={initialFilters} />

          <div className="mt-4 border-t border-[#D2D2D2] pt-4 pb-10">
            <Button
              onClick={handleClose}
              className="w-full gap-2 transition-transform duration-200 ease-out hover:-translate-y-px"
            >
              <SearchIcon /> <span>{t("filters.apply")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
