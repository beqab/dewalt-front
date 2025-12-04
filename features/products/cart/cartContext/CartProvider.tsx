"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { CartContext } from ".";
import type { CartItem, CartContextType } from "../types";
import type { Product } from "../../types";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const isInitialized = useRef(false);

  // Load from localStorage on client side only
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized.current) {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        try {
          const parsed = JSON.parse(cartItems);
          startTransition(() => {
            setItems(parsed);
          });
          isInitialized.current = true;
        } catch (error) {
          console.error("Failed to parse cartItems from localStorage", error);
        }
      } else {
        isInitialized.current = true;
      }
    }
  }, []);

  // Sync to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selected: true }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleSelect = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = items.every((item) => item.selected);
    setItems((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const removeSelected = () => {
    setItems((prev) => prev.filter((item) => !item.selected));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getSelectedItems = () => {
    return items.filter((item) => item.selected);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    toggleSelect,
    toggleSelectAll,
    removeSelected,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSelectedItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

