"use client";

import Link from "next/link";
import { useProductMenuContext } from "../context";

export default function DropDownMenuSubcategories() {
  const { categories, activeCategory, activeMainCategory } =
    useProductMenuContext();

  if (!categories || activeCategory === null) return null;

  const subCategories =
    categories?.length > 0
      ? categories?.[activeMainCategory]?.categories?.[activeCategory]
          ?.subCategories
      : [];

  if (!subCategories || subCategories.length === 0) return null;

  return (
    <div className="max-h-[500px] w-1/2 overflow-y-auto">
      <ul className="py-2">
        {subCategories.map((subCategory, subIndex) => (
          <li
            key={subIndex}
            className="cursor-pointer transition-colors hover:bg-gray-50"
          >
            <Link
              href={`/products?category=${subCategory.slug}`}
              className="block px-4 leading-8 hover:font-bold"
            >
              <span className="text-sm text-[#1E1E1E]">{subCategory.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
