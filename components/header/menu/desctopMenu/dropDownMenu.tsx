"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MenuItemWithArrow, MenuSubItem } from "../menuItm";

interface Brand {
  name: string;
  categories: {
    name: string;
    nameEn: string;
    subCategories: {
      name: string;
      nameEn: string;
      slug: string;
      items: {
        name: string;
        nameEn: string;
        slug: string;
      }[];
    }[];
  }[];
}

interface DropDownMenuProps {
  brand: Brand;
  brandIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function DropDownMenu({
  brand,
  brandIndex,
  isOpen,
  onToggle,
  onClose,
}: DropDownMenuProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Compute initial category - first category with subcategories
  const getInitialCategory = () => {
    if (!isOpen) return null;
    const firstCategoryWithSubs = brand.categories.findIndex(
      (cat) => cat.subCategories.length > 0
    );
    return firstCategoryWithSubs !== -1 ? firstCategoryWithSubs : null;
  };

  const [activeCategory, setActiveCategory] = useState<number | null>(
    getInitialCategory()
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const getDisplayName = (item: { name: string; nameEn: string }) => {
    return locale === "ka" ? item.name : item.nameEn;
  };

  // Component resets when key changes in parent, so we just initialize state
  // No need for useEffect to sync state

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCategoryClick = (
    categoryIndex: number,
    hasSubCategories: boolean
  ) => {
    if (hasSubCategories) {
      if (activeCategory === categoryIndex) {
        // Toggle off if clicking the same category
        setActiveCategory(null);
      } else {
        // Show subcategories
        setActiveCategory(categoryIndex);
      }
    } else {
      // No subcategories, just highlight
      setActiveCategory(categoryIndex);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <MenuItemWithArrow
        isActive={isOpen}
        label={brand.name}
        onClick={onToggle}
      />

      {isOpen && brand.categories.length > 0 && (
        <div className="absolute top-full left-0 z-50 bg-neutral rounded-lg overflow-hidden shadow-lg min-w-[600px] mt-5">
          <div className="flex">
            {/* Left Column - Categories */}
            <div className="w-1/2 bg-background-secondary border-r border-gray-200">
              <ul className="py-2">
                {brand.categories.map((category, categoryIndex) => {
                  const hasSubCategories = category.subCategories.length > 0;

                  return (
                    <MenuSubItem
                      key={categoryIndex}
                      onClick={(parentId: string, id: string) =>
                        handleCategoryClick(parseInt(id), hasSubCategories)
                      }
                      parentId={brandIndex.toString()}
                      id={categoryIndex.toString()}
                      displayName={getDisplayName(category)}
                      hasSubCategories={hasSubCategories}
                      isActive={activeCategory === categoryIndex}
                    />
                  );
                })}
              </ul>
            </div>

            {/* Right Column - Subcategories */}
            {activeCategory !== null &&
              brand.categories[activeCategory]?.subCategories.length > 0 && (
                <div className="w-1/2 overflow-y-auto max-h-[500px]">
                  <ul className="py-2">
                    {brand.categories[activeCategory].subCategories.map(
                      (subCategory, subIndex) => (
                        <li
                          key={subIndex}
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <Link
                            href={subCategory.slug}
                            className="px-4 leading-8 block hover:font-bold"
                          >
                            <span className="text-sm text-[#1E1E1E]">
                              {getDisplayName(subCategory)}
                            </span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
