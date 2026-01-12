"use client";

import { useProductMenuContext } from "../context";
import { MenuSubItem } from "../../../menuItm";

export default function DropDownMenuBrands({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    categories: allCategories,
    activeMainCategory,
    setActiveMainCategory,
    setActiveCategory,
  } = useProductMenuContext();

  if (!allCategories || allCategories?.length === 0) return null;

  const brandSlug = allCategories?.[activeMainCategory]?.slug;
  return (
    <div className="bg-background-secondary w-1/3 border-r border-gray-200">
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
            slug={category.slug}
            brandSlug={brandSlug}
            closeMenu={onClose}
          />
        ))}
      </ul>
    </div>
  );
}
