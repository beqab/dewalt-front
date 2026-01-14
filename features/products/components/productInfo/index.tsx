"use client";

import ShieldIcon from "@/components/icons/shieldIcon";
import StockIcon from "@/components/icons/stockIcon";
import ShareButton from "@/components/ui/ShareButton";
import { useTranslations } from "next-intl";
import AddToCart from "../../cart/components/addToCart";
import { CompareButton } from "../../compare/components/compareButton";
import { Product } from "../../types";
import ProductRating from "../productRating";

export default function ProductInfo({ product }: { product: Product }) {
  const t = useTranslations();
  const { name, price, code, _id, rating, reviewCount, brandId, categoryId } =
    product;

  return (
    <div className="m-auto w-full max-w-[410px] space-y-4 md:m-0 md:max-w-none">
      {/* Product Title */}
      <h1 className="text-dark-secondary-100 font-bpg-web-002-caps text-2xl md:text-3xl">
        {name}
      </h1>

      {/* Rating and Compare */}
      <div className="flex items-center gap-2 md:mb-6">
        <ProductRating
          productId={_id}
          initialRating={rating}
          initialReviewCount={reviewCount}
        />
      </div>

      {/* Price and Checkbox */}
      <div className="flex items-center gap-4 md:mb-6">
        <span className="text-dark-secondary-100 text-2xl">{price} GEL</span>
        <CompareButton productId={_id} />
      </div>

      {/* Product Details */}
      <div className="space-y-2 md:mb-6">
        <div className="text-dark-secondary-100 text-sm">
          <span className="text-text-secondary text-sm">
            {t("product.brand")}:{" "}
          </span>
          {brandId.name}
        </div>
        <div className="text-dark-secondary-100 text-sm">
          <span className="text-text-secondary text-sm">
            {t("product.productCode")}:{" "}
          </span>
          {code}
        </div>
        <div className="text-dark-secondary-100 text-sm">
          <span className="text-text-secondary text-sm">
            {t("product.category")}:{" "}
          </span>
          {categoryId.name}
        </div>
      </div>

      {/* Quantity Selector and Add to Cart */}
      <AddToCart product={product} />

      {/* Additional Information */}
      <div className="border-line-color flex flex-wrap gap-2 space-y-3 border-t pt-4 md:gap-4">
        <div className="bg-background-secondary flex h-8 items-center gap-2 rounded p-2">
          <StockIcon />
          <span className="text-dark-secondary-100 text-sm">
            {t("product.delivery")}
          </span>
        </div>
        <div className="bg-background-secondary flex h-8 items-center gap-2 rounded p-2">
          <ShieldIcon />
          <span className="text-dark-secondary-100 text-sm">
            {t("product.warranty")}
          </span>
        </div>
        <ShareButton />
      </div>
    </div>
  );
}
