"use client";
import { createContext, useContext } from "react";
import type { CartContextType } from "../types";

export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  toggleSelect: () => {},
  toggleSelectAll: () => {},
  removeSelected: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  getSelectedItems: () => [],
});

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}

