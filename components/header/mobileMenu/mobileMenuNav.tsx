"use client";

import { Link } from "@/i18n/navigation";
import { MenuItemWithArrow } from "../menu/menuItm";
import { brands } from "../menu/staticMenu";
import { useState } from "react";
import MenuCategories from "./menuCategories";
import { useTranslations } from "next-intl";

export default function MobileMenuNav({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const [openMenuCategory, setOpenMenuCategory] = useState<number | null>(null);

  const handleOpenMenuCategory = (category: number | null) => {
    setOpenMenuCategory(category);
  };

  if (openMenuCategory !== null) {
    return (
      <MenuCategories
        onClose={onClose}
        category={openMenuCategory}
        onchangeCategory={handleOpenMenuCategory}
      />
    );
  }

  return (
    <nav className="py-2 pl-5">
      {/* Home */}
      <Link
        href="/"
        prefetch={true}
        onClick={() => onClose()}
        className="font-inter text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        {t("navigation.home")}
      </Link>

      {/* Products */}
      <MenuItemWithArrow
        isActive={!!openMenuCategory}
        label={t("navigation.products")}
        href="/products"
        className="text-[16px]"
        onClick={() => handleOpenMenuCategory(0)}
      />
      {/* Brands */}
      {brands.map((brand, index) => (
        <MenuItemWithArrow
          key={index}
          isActive={!!openMenuCategory}
          label={brand.name}
          className="text-[16px]"
          onClick={() => handleOpenMenuCategory(index)}
        />
      ))}
      {/* News */}
      <Link
        href="/news"
        prefetch={true}
        onClick={() => onClose()}
        className="text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        {t("navigation.news")}
      </Link>

      {/* Service Center */}
      <Link
        href="/service-center"
        prefetch={true}
        onClick={() => onClose()}
        className="text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        {t("navigation.serviceCenter")}
      </Link>

      {/* Contact */}
      <Link
        href="/contact"
        prefetch={true}
        onClick={() => onClose()}
        className="text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        {t("navigation.contact")}
      </Link>
    </nav>
  );
}
