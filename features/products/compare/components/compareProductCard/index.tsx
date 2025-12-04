"use client";

import Image from "next/image";
import Link from "next/link";
import { BucketIcon } from "@/components/icons/bucketIcon";
import { Button } from "@/components/ui/button";
import type { CompareProductWithSpecs } from "../../types";

import DeleteProductByIdButton from "../deleteProductByIdButton";

interface CompareProductCardProps {
  product: CompareProductWithSpecs;
}

export default function CompareProductCard({
  product,
}: CompareProductCardProps) {
  const { image, name, code, price, originalPrice, _id } = product;

  return (
    <div className="relative min-w-[220px] shrink-0 md:min-w-[240px]">
      <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-white p-4 shadow-sm">
        {/* Delete Button */}
        <DeleteProductByIdButton id={_id} />

        {/* Product Image */}
        <Link href={`/products/${_id}`} className="block">
          <div className="relative mb-3 aspect-square h-[190px] w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-2 transition-transform hover:scale-105"
              sizes="(max-width: 768px) 280px, 240px"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex flex-1 flex-col">
          <Link
            href={`/products/${_id}`}
            className="text-dark-secondary-100 hover:text-primary mb-2 h-12 text-sm font-bold transition-colors"
          >
            {name} {code}
          </Link>

          {/* Price */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-dark-secondary-100 text-lg font-semibold">
              {price} GEL
            </span>
            {originalPrice && (
              <span className="text-text-secondary text-sm line-through">
                {originalPrice} GEL
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button variant="default" className="h-10 w-full" size="sm">
            <BucketIcon className="fill-dark-secondary-100" />
            <span>კალათაში</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
