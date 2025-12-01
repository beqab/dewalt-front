"use client";

import { useProductMenuContext } from "../context";
import { MenuSubItem } from "../../../menuItm";

export default function DropDownMenuCategories() {
  const {
    categories: allCategories,
    activeCategory,
    setActiveCategory,
    activeMainCategory,
  } = useProductMenuContext();

  if (!allCategories || allCategories?.length === 0) return null;

  const categories =
    allCategories?.length > 0
      ? allCategories?.[activeMainCategory]?.categories
      : [];

  if (!categories || categories?.length === 0) return null;

  return (
    <div className="w-1/2 bg-background-secondary border-r border-gray-200">
      <ul className="py-2">
        {categories.map((category, categoryIndex) => {
          const hasSubCategories = category.subCategories.length > 0;

          return (
            <MenuSubItem
              key={categoryIndex}
              onClick={() => setActiveCategory(categoryIndex)}
              parentId={activeMainCategory.toString()}
              id={categoryIndex.toString()}
              displayName={category.name}
              hasSubCategories={hasSubCategories}
              isActive={activeCategory === categoryIndex}
            />
          );
        })}
      </ul>
    </div>
  );
}
