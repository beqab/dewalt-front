"use client";

import { useProductMenuContext } from "../context";
import { MenuSubItem } from "../../../menuItm";

export default function DropDownMenuBrands() {
  const {
    categories: allCategories,
    activeMainCategory,
    setActiveMainCategory,
    setActiveCategory,
  } = useProductMenuContext();

  if (!allCategories || allCategories?.length === 0) return null;

  return (
    <div className="w-1/3 bg-background-secondary border-r border-gray-200">
      <ul className="py-2">
        {allCategories.map((category, categoryIndex) => (
          <MenuSubItem
            key={categoryIndex}
            onClick={() => {
              setActiveCategory(0);
              setActiveMainCategory(categoryIndex);
            }}
            parentId={categoryIndex.toString()}
            id={categoryIndex.toString()}
            displayName={category.name}
            hasSubCategories={true}
            isActive={activeMainCategory === categoryIndex}
          />
        ))}
      </ul>
    </div>
  );
}
