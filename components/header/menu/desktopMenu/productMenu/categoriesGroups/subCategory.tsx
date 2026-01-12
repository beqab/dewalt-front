"use client";

import { Link } from "@/i18n/navigation";
import { useProductMenuContext } from "../context";

export default function DropDownMenuSubcategories({
  onClose,
}: {
  onClose: () => void;
}) {
  const { categories, activeCategory, activeMainCategory } =
    useProductMenuContext();

  if (!categories || activeCategory === null) return null;

  const subCategories =
    categories?.length > 0
      ? categories?.[activeMainCategory]?.categories?.[activeCategory]
          ?.subCategories
      : [];

  if (!subCategories || subCategories.length === 0) return null;

  const brandSlug = categories?.[activeMainCategory]?.slug;
  const categorySlug =
    categories?.[activeMainCategory]?.categories?.[activeCategory]?.slug;

  return (
    <div className="max-h-[500px] w-1/2 overflow-y-auto">
      <ul className="py-2">
        {subCategories.map((subCategory, subIndex) => (
          <li
            key={subIndex}
            className="cursor-pointer transition-colors hover:bg-gray-50"
          >
            <Link
              href={`/products?childCategory=${subCategory.slug}&brand=${brandSlug}&category=${categorySlug}`}
              onNavigate={onClose}
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
