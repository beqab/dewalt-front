import { useEffect, useRef, useState } from "react";
import { ProductMenuContext } from "./context";

import MainMenuItem from "./mainMenuItem";
import ProductMenuPanel from "./panel";
import DropDownMenuCategories from "./categoriesGroups/categories";
import DropDownMenuSubcategories from "./categoriesGroups/subCategory";
import DropDownMenuBrands from "./categoriesGroups/mainCategories";
import { MenuBrand } from "@/features/categories/types";

export default function ProductMenu({
  productCategories,
  children,
  isOpen,
  onClose,
}: {
  productCategories: MenuBrand[];
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenuId, setOpenMenuId] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeMainCategory, setActiveMainCategory] = useState<number>(0);

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
      setActiveCategory(0);
    };
  }, [isOpen, onClose]);

  return (
    <ProductMenuContext.Provider
      value={{
        categories: productCategories,
        openMenuId: openMenuId,
        activeCategory: activeCategory,
        activeMainCategory: activeMainCategory,
        setOpenMenuId: setOpenMenuId,
        setActiveCategory: setActiveCategory,
        setActiveMainCategory: setActiveMainCategory,
      }}
    >
      <div className="relative" ref={menuRef}>
        {children}
      </div>
    </ProductMenuContext.Provider>
  );
}

ProductMenu.MainMenuItem = MainMenuItem;
ProductMenu.Panel = ProductMenuPanel;
ProductMenu.Categories = DropDownMenuCategories;
ProductMenu.SubCategory = DropDownMenuSubcategories;
ProductMenu.MainCategories = DropDownMenuBrands;
