"use client";
import { createContext, useContext } from "react";

interface CompareContextType {
  productIds: string[] | null;
  setProductIds: (productIds: string) => void;
  deleteProductId: (productId: string) => void;
  clearAllProducts: () => void;
}

export const CompareContext = createContext<CompareContextType>({
  productIds: null,
  setProductIds: () => {},
  deleteProductId: () => {},
  clearAllProducts: () => {},
});

export function useCompareContext() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error(
      "useCompareContext must be used within a CompareContextProvider"
    );
  }
  return context;
}
