"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { CompareContext } from ".";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function CompareProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize as null to indicate localStorage hasn't been checked yet
  const [productIds, setProductIds] = useState<string[] | null>(null);
  const isInitialized = useRef(false);
  const t = useTranslations();

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
          // Set to empty array on parse error
          startTransition(() => {
            setProductIds([]);
          });
          isInitialized.current = true;
        }
      } else {
        // No data in localStorage, set to empty array
        startTransition(() => {
          setProductIds([]);
        });
        isInitialized.current = true;
      }
    }
  }, []);

  // Sync to localStorage whenever productIds changes (only if not null)
  useEffect(() => {
    if (typeof window !== "undefined" && productIds !== null) {
      localStorage.setItem("compareProductIds", JSON.stringify(productIds));
    }
  }, [productIds]);

  function handleProductId(id: string) {
    // If productIds is null, initialize to empty array first
    const currentIds = productIds ?? [];
    const exist = currentIds.includes(id);

    // If product exists, remove it (toggle off)
    if (exist) {
      setProductIds((prev) => {
        return (prev ?? []).filter((productId) => productId !== id);
      });
      return;
    }

    // If product doesn't exist, try to add it
    // Check if we've reached the maximum (3 products)
    if (currentIds.length >= 3) {
      toast.error(t("products.maxCompareReached"));
      return;
    }

    // Add the product
    setProductIds((prev) => [...(prev ?? []), id]);
  }

  function handleDeleteProductId(id: string) {
    if (id === "all") {
      setProductIds([]);
      return;
    }
    setProductIds((prev) =>
      (prev ?? []).filter((productId) => productId !== id)
    );
  }

  function clearAllProducts() {
    localStorage.removeItem("compareProductIds");
    setProductIds(null);
  }

  return (
    <CompareContext
      value={{
        productIds,
        setProductIds: handleProductId,
        deleteProductId: handleDeleteProductId,
        clearAllProducts,
      }}
    >
      {children}
    </CompareContext>
  );
}
