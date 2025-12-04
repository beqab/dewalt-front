"use client";

import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import TrashIcon from "@/components/icons/trashIcon";
import type { CartItem as CartItemType } from "../../types";
import { useCartContext } from "../../cartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { product, quantity, selected } = item;
  const { toggleSelect, updateQuantity, removeItem } = useCartContext();

  const handleQuantityChange = (delta: number) => {
    updateQuantity(product._id, quantity + delta);
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateQuantity(product._id, value);
    } else if (e.target.value === "") {
      updateQuantity(product._id, 1);
    }
  };

  return (
    <div className="border-line-color flex gap-4 border-b pb-4 pt-4 last:border-0">
      {/* Checkbox */}
      <div className="flex items-start pt-2">
        <Checkbox
          checked={selected}
          onChange={() => toggleSelect(product._id)}
        />
      </div>

      {/* Product Image */}
      <Link href={`/products/${product._id}`} className="shrink-0">
        <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 md:h-32 md:w-32">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 96px, 128px"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Link
            href={`/products/${product._id}`}
            className="text-dark-secondary-100 hover:text-primary mb-1 block text-sm font-bold transition-colors md:text-base"
          >
            {product.name} {product.code}
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-dark-secondary-100 text-base font-semibold md:text-lg">
              {product.price} GEL
            </span>
            {product.originalPrice && (
              <span className="text-text-secondary text-sm line-through">
                {product.originalPrice} GEL
              </span>
            )}
          </div>
        </div>

        {/* Quantity and Delete */}
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="border-line-color flex items-center rounded border">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              className="h-8 px-2 hover:bg-gray-50 md:h-10 md:px-3"
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
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityInput}
              className="w-12 border-0 text-center text-sm focus:ring-0 focus:outline-none md:w-16"
            />
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              className="h-8 px-2 hover:bg-gray-50 md:h-10 md:px-3"
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

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => removeItem(product._id)}
            className="text-text-secondary hover:text-dark-secondary-100 flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
            aria-label="Delete item"
          >
            <TrashIcon />
            <span className="hidden md:inline">წაშლა</span>
          </button>
        </div>
      </div>
    </div>
  );
}

