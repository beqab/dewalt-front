"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { CompareContext } from ".";
import { toast } from "sonner";

export default function CompareProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const isInitialized = useRef(false);

  // Load from localStorage on client side only
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized.current) {
      const compareProductIds = localStorage.getItem("compareProductIds");
      if (compareProductIds) {
        try {
          const parsed = JSON.parse(compareProductIds);
          startTransition(() => {
            setProductIds(parsed);
          });
          isInitialized.current = true;
        } catch (error) {
          console.error(
            "Failed to parse compareProductIds from localStorage",
            error
          );
        }
      } else {
        isInitialized.current = true;
      }
    }
  }, []);

  // Sync to localStorage whenever productIds changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("compareProductIds", JSON.stringify(productIds));
    }
  }, [productIds]);

  function handleProductId(id: string) {
    const exist = productIds.includes(id);

    // If product exists, remove it (toggle off)
    if (exist) {
      setProductIds((prev) => {
        console.log(prev);
        return prev.filter((productId) => productId !== id);
      });
      return;
    }

    // If product doesn't exist, try to add it
    // Check if we've reached the maximum (4 products)
    if (productIds.length >= 3) {
      toast.error(
        "შესადარებელ სიაში შესაძლებელია მაქსიმუმ 3 პროდუქტის დამატება"
      );
      return;
    }

    // Add the product
    setProductIds((prev) => [...prev, id]);
  }

  function handleDeleteProductId(id: string) {
    if (id === "all") {
      setProductIds([]);
      return;
    }
    setProductIds((prev) => prev.filter((productId) => productId !== id));
  }

  return (
    <CompareContext
      value={{
        productIds,
        setProductIds: handleProductId,
        deleteProductId: handleDeleteProductId,
      }}
    >
      {children}
    </CompareContext>
  );
}
