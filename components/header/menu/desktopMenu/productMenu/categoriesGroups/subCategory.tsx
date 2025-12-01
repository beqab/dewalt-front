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
    <div className="w-1/2 overflow-y-auto max-h-[500px]">
      <ul className="py-2">
        {subCategories.map((subCategory, subIndex) => (
          <li
            key={subIndex}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Link
              href={subCategory.slug}
              className="px-4 leading-8 block hover:font-bold"
            >
              <span className="text-sm text-[#1E1E1E]">{subCategory.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
