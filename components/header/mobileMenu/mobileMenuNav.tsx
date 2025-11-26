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
    <nav className="py-2 pl-5 ">
      {/* Home */}
      <Link
        href="/"
        onClick={() => onClose()}
        className="block font-inter  py-3 text-dark-secundary-100 hover:bg-gray-100 transition-colors font-medium"
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
        className="block  py-3 text-dark-secundary-100 hover:bg-gray-100 transition-colors font-medium"
      >
        სიახლეები
      </Link>

      {/* Service Center */}
      <Link
        href="/service-center"
        onClick={() => onClose()}
        className="block  py-3 text-dark-secundary-100 hover:bg-gray-100 transition-colors font-medium"
      >
        სერვის ცენტრი
      </Link>

      {/* Contact */}
      <Link
        href="/contact"
        onClick={() => onClose()}
        className="block  py-3 text-dark-secundary-100 hover:bg-gray-100 transition-colors font-medium"
      >
        კონტაქტი
      </Link>
    </nav>
  );
}
