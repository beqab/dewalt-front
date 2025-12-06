"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BucketIcon } from "@/components/icons/bucketIcon";
import { useCartContext } from "../../cartContext";
import { Link as I18nLink } from "@/i18n/navigation";
import useOnclicOutside from "@/hooks/useOnclicOutside";
import TrashIcon from "@/components/icons/trashIcon";

export default function CartPreview() {
  const { items, getTotalItems, getTotalPrice, removeItem } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useOnclicOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hover relative flex cursor-pointer items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Cart"
      >
        <BucketIcon className="text-primary" />
        {totalItems > 0 && (
          <span className="bg-primary text-dark-secondary-100 absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="border-line-color absolute top-full right-0 z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg md:w-96">
          <div className="max-h-[500px] overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-text-secondary text-sm">კალათა ცარიელია</p>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="border-line-color flex gap-3 border-b pb-3 last:border-0"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/products/${item.product._id}`}
                        onClick={() => setIsOpen(false)}
                        className="shrink-0"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                            sizes="64px"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col gap-1">
                        <Link
                          href={`/products/${item.product._id}`}
                          onClick={() => setIsOpen(false)}
                          className="text-dark-secondary-100 hover:text-primary line-clamp-2 text-xs font-semibold transition-colors"
                        >
                          {item.product.name} {item.product.code}
                        </Link>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-dark-secondary-100 text-sm font-semibold">
                              {item.product.price} GEL
                            </span>
                            <span className="text-text-secondary text-xs">
                              x{item.quantity}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product._id)}
                            className="text-text-secondary hover:text-dark-secondary-100 rounded p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total and View Cart Button */}
                <div className="border-line-color mt-4 border-t pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-text-secondary text-sm">სულ:</span>
                    <span className="text-dark-secondary-100 text-lg font-bold">
                      {totalPrice.toLocaleString("ka-GE")} GEL
                    </span>
                  </div>
                  <I18nLink
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="bg-primary hover:bg-primary/90 text-dark-secondary-100 block w-full rounded px-4 py-2 text-center text-sm font-medium transition-colors"
                  >
                    კალათაში გადასვლა
                  </I18nLink>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
