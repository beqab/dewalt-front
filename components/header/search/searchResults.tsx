"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/features/products/types";
import { generateSlug } from "@/lib/utils/slugify";
import { useTranslations } from "next-intl";
import SearchSkeleton from "./searchSkeleton";

interface SearchResultsProps {
  products: Product[];
  isLoading: boolean;
  onProductClick?: () => void;
}

export default function SearchResults({
  products,
  isLoading,
  onProductClick,
}: SearchResultsProps) {
  const t = useTranslations();

  if (isLoading) {
    return <SearchSkeleton />;
  }

  return (
    <div className="bg-background absolute top-full left-0 z-50 mt-2 max-h-[60vh] w-full overflow-y-auto rounded-lg border border-gray-200 shadow-lg md:max-h-[500px] md:w-[500px]">
      <div className="p-2">
        <div className="space-y-0">
          {products.length === 0 ? (
            <div>
              <p className="text-text-secondary text-sm">
                {t("products.noProductsFound")}
              </p>
            </div>
          ) : (
            products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${generateSlug(product.name, product._id)}`}
                onClick={onProductClick}
                className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                {/* Product Thumbnail */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Product Info */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-dark-secondary-100 line-clamp-2 text-sm font-medium">
                    {product.name} {product.code}
                  </p>
                </div>

                {/* Price */}
                <div className="shrink-0">
                  <p className="text-dark-secondary-100 text-sm font-semibold whitespace-nowrap">
                    {product.price} GEL
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
