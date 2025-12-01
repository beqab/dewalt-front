import Link from "next/link";
import MenuItem, { MenuItemWithArrow } from "../menu/menuItm";
import { brands } from "../menu/staticMenu";
import { useState } from "react";
import MenuCategories from "./menuCategories";

export default function MobileMenuNav({ onClose }: { onClose: () => void }) {
  const [openMenuCategory, setOpenMenuCategory] = useState<number | null>(null);

  const handleOpenMenuCategory = (category: number | null) => {
    setOpenMenuCategory(category);
  };

  if (openMenuCategory !== null) {
    return (
      <MenuCategories
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
        onClick={() => onClose()}
        className="font-inter text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        მთავარი
      </Link>

      {/* Products */}
      <MenuItemWithArrow
        isActive={!!openMenuCategory}
        label="პროდუქტები"
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
        onClick={() => onClose()}
        className="text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        სიახლეები
      </Link>

      {/* Service Center */}
      <Link
        href="/service-center"
        onClick={() => onClose()}
        className="text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        სერვის ცენტრი
      </Link>

      {/* Contact */}
      <Link
        href="/contact"
        onClick={() => onClose()}
        className="text-dark-secondary-100 block py-3 font-medium transition-colors hover:bg-gray-100"
      >
        კონტაქტი
      </Link>
    </nav>
  );
}
