"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BucketIcon } from "@/components/icons/bucketIcon";
import CompareIcon from "@/components/icons/compareIcon";
import FbMessenger from "@/public/icons/fbmessenger.svg";
import Rating from "@/components/rating";
import StockIcon from "@/components/icons/stockIcon";
import ShieldIcon from "@/components/icons/shieldIcon";
import ShareButton from "@/components/ui/ShareButton";
import { CompareButton } from "../../compare/components/compareButton";

interface ProductInfoProps {
  name?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  brand?: string;
  code?: string;
  category?: string;
  inStock?: boolean;
  _id?: string;
}

export default function ProductInfo({
  name = "პოლისტიჩი - DW 468435 43843854 3 38543 43545",
  rating = 4.5,
  reviewCount = 526,
  price = 1950,
  brand = "Dewalt",
  code = "18554FX",
  category = "ელექტრო ხელსაწყოები",
  _id = "1234567890",
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(3);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  return (
    <div className="m-auto w-full max-w-[410px] space-y-4 md:max-w-none">
      {/* Product Title */}
      <h1 className="text-dark-secondary-100 text-2xl font-bold md:text-3xl">
        {name}
      </h1>

      {/* Rating and Compare */}

      <div className="flex items-center gap-2 md:mb-6">
        <Rating rating={rating} interactive={true} reviewCount={reviewCount} />
      </div>

      {/* Price and Checkbox */}
      <div className="flex items-center gap-4 md:mb-6">
        <span className="text-dark-secondary-100 text-2xl">{price} GEL</span>
        <CompareButton productId={_id} />
      </div>

      {/* Product Details */}
      <div className="space-y-2 md:mb-6">
        <div className="text-dark-secondary-100 text-sm">
          <span className="text-text-secondary text-sm">ბრენდი: </span>
          {brand}
        </div>
        <div className="text-dark-secondary-100 text-sm">
          <span className="text-text-secondary text-sm">პროდუქტის კოდი: </span>
          {code}
        </div>
        <div className="text-dark-secondary-100 text-sm">
          <span className="text-text-secondary text-sm">კატეგორია: </span>
          {category}
        </div>
      </div>

      {/* Quantity Selector and Add to Cart */}
      <div className="flex flex-row items-end gap-4">
        {/* Quantity Selector */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="quantity" className="text-text-secondary text-[10px]">
            რაოდენობა:
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
              value={quantity}
              onChange={handleQuantityInputChange}
              className="w-16 border-0 text-center text-sm focus:ring-0 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              className="px-2 py-2 hover:bg-gray-50"
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
        <Button size="md" className="w-full flex-1 sm:flex-initial md:w-auto">
          <BucketIcon className="fill-dark-secondary-100 text-dark-secondary-100 h-6 w-6" />
          <span>კალათაში დამატება</span>
        </Button>
      </div>

      {/* Additional Information */}
      <div className="border-line-color flex flex-wrap gap-2 space-y-3 border-t pt-4 md:gap-4">
        <div className="bg-background-secondary flex h-8 items-center gap-2 rounded p-2">
          <StockIcon />
          <span className="text-dark-secondary-100 text-sm">მიწოდება</span>
        </div>
        <div className="bg-background-secondary flex h-8 items-center gap-2 rounded p-2">
          <ShieldIcon />
          <span className="text-dark-secondary-100 text-sm">გარანტია</span>
        </div>
        <ShareButton />
      </div>
    </div>
  );
}
