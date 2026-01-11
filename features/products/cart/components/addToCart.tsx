"use client";

import { Button } from "@/components/ui/button";
import { Product } from "../../types";
import { useCartContext } from "../cartContext";
import { useState } from "react";
import { BucketIcon } from "@/components/icons/bucketIcon";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function AddToCart({ product }: { product: Product }) {
  const t = useTranslations();
  const { addItem } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  const maxQuantity = product.quantity || 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + delta;
      // Ensure quantity is between 1 and available stock
      return Math.max(1, Math.min(newQuantity, maxQuantity));
    });
  };

  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    // Allow empty string for better UX (user can clear and type new number)
    if (inputValue === "") {
      setQuantity(0); // Use 0 as placeholder to allow empty input
      return;
    }

    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value > 0) {
      // Cap the quantity at available stock
      const cappedValue = Math.min(value, maxQuantity);
      setQuantity(cappedValue);

      // Show warning if user tried to exceed stock
      if (value > maxQuantity && maxQuantity > 0) {
        toast.warning(
          t("cart.maxQuantityReached", {
            defaultValue: `Maximum available quantity is ${maxQuantity}`,
            maxQuantity,
          }),
          {
            duration: 2000,
          }
        );
      }
    }
  };

  const handleQuantityBlur = () => {
    // If input is empty or 0, set to 1
    if (quantity === 0 || quantity < 1) {
      setQuantity(1);
    }
  };

  const handleQuantityFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when input is focused for easy replacement
    e.target.select();
  };

  const handleAddToCart = () => {
    const finalQuantity = Math.min(quantity, maxQuantity);

    addItem(product, finalQuantity);
    toast.success(t("cart.addedToCart"), {
      style: {
        background: "#FFBA00",
        color: "#1A1A1A",
        border: "1px solid #E5A500",
      },
      duration: 1000,
    });
  };
  return (
    <div className="flex flex-row items-end gap-4">
      {/* Quantity Selector */}
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="quantity" className="text-text-secondary text-[10px]">
          {t("product.quantity")}:
        </label>
        <div className="border-line-color flex items-center rounded border">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            className="h-9.5 px-2 hover:bg-gray-50"
            aria-label="Decrease quantity"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8H12"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max={maxQuantity || undefined}
            value={quantity === 0 ? "" : quantity}
            onChange={handleQuantityInputChange}
            onBlur={handleQuantityBlur}
            onFocus={handleQuantityFocus}
            className="w-16 border-0 text-center text-sm focus:ring-0 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= maxQuantity || maxQuantity === 0}
            className="px-2 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Increase quantity"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 4V12M4 8H12"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="md"
        className="w-full flex-1 sm:flex-initial md:w-auto"
        disabled={!product.inStock || maxQuantity === 0}
        onClick={handleAddToCart}
      >
        <BucketIcon className="h-6 w-6" />
        <span>{t("cart.addToCart")}</span>
      </Button>
    </div>
  );
}

export const AddSingleItemToCart = ({
  product,
  size = "md",
}: {
  product: Product;
  size: "sm" | "md";
}) => {
  const t = useTranslations();
  const { addItem } = useCartContext();

  const handleClick = () => {
    addItem(product, 1);
    toast.success(t("cart.addedToCart"), {
      style: {
        background: "#FFBA00",
        color: "#1A1A1A",
        border: "1px solid #E5A500",
      },
      duration: 1000,
    });
  };
  return (
    <button
      type="button"
      className={cn(
        "bg-primary hover:bg-primary/90 text-dark-secondary-100 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all hover:scale-103 xl:max-w-[98px]",
        {
          "xl:max-w-[98px]": size === "md",
          "xl:max-w-full": size === "sm",
        }
      )}
      onClick={handleClick}
    >
      <BucketIcon
        className={cn("text-dark-secondary-100", {
          "xl:hidden": size === "md",
        })}
      />
      <span className={"hidden lg:inline"}>{t("cart.add")}</span>
      <span className="xl:hidden">{t("cart.toCart")}</span>
    </button>
  );
};
