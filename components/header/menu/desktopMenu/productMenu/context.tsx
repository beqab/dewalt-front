"use client";

import { createContext, useContext } from "react";

import { MenuBrand } from "@/features/categories/types";

const initialValue: {
  categories: MenuBrand[] | null;
  openMenuId: string;
  activeCategory: number;
  activeMainCategory: number;
  setOpenMenuId: (id: string) => void;
  setActiveCategory: (category: number) => void;
  setActiveMainCategory: (subcategory: number) => void;
} = {
  categories: [],
  openMenuId: "",
  activeCategory: 0,
  activeMainCategory: 0,
  setOpenMenuId: () => {},
  setActiveCategory: () => {},
  setActiveMainCategory: () => {},
};

const ProductMenuContext = createContext<typeof initialValue | null>(
  initialValue
);

export function useProductMenuContext() {
  const context = useContext(ProductMenuContext);
  if (!context) {
    throw new Error(
      "Product menu components must be used within ProductMenuContext. Make sure to wrap your product menu with <ProductMenu>"
    );
  }
  return context;
}

export { ProductMenuContext };
