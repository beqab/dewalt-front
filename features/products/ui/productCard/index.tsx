import { BucketIcon } from "@/components/icons/bucketIcon";
import Image from "next/image";
import type { Product } from "../../types";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  size = "md",
  className,
}: {
  product: Product;
  size?: "sm" | "md";
  className?: string;
}) {
  const {
    image,
    name,
    code,
    description,
    price,
    originalPrice,
    discount,
    inStock,
    id,
  } = product;
  return (
    <div
      className={cn(
        "relative min-w-0 flex-[0_0_calc(66.666%-0.5rem)] px-2 md:min-w-[240px] md:flex-[0_0_calc(25%)]",
        {
          "md:min-w-[240px]": size === "sm",
        },
        className
      )}
    >
      <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-white p-3 shadow-sm transition-shadow hover:shadow-md md:p-4">
        {/* Discount Badge */}
        {discount && (
          <div className="bg-discount-BG text-discount-text absolute top-2 left-2 z-10 rounded px-1 py-2 text-xs font-normal">
            {discount}%
          </div>
        )}

        {/* Compare Checkbox */}
        <div className="absolute top-2 right-2 z-10">
          <label className="text-dark-secondary-70 flex cursor-pointer items-center gap-1 text-xs">
            <input
              type="checkbox"
              className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
            />
            <span>შედარება</span>
          </label>
        </div>

        {/* Product Image */}
        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 66.666vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-dark-secondary-100 mb-2 h-12 text-sm font-bold md:h-14 md:text-base">
            {name} {code}
          </h3>
          <p className="text-text-secondary mb-4 text-xs">{description}</p>

          {/* Price */}
          <div
            className={cn({
              "mt-auto xl:flex xl:items-center xl:justify-between":
                size === "md",
              "mt-auto": size === "sm",
            })}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-dark-secondary-100">{price} GEL</span>
              {originalPrice && (
                <span className="text-text-secondary text-xs line-through">
                  {product.originalPrice} GEL
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              className={cn(
                "bg-primary hover:bg-primary/90 text-dark-secondary-100 flex h-10 w-full items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors xl:max-w-[98px]",
                {
                  "xl:max-w-[98px]": size === "md",
                  "xl:max-w-full": size === "sm",
                }
              )}
            >
              <BucketIcon
                className={cn(
                  "md:fill-dark-secondary-100 fill-dark-secondary-100",
                  {
                    "xl:hidden": size === "md",
                  }
                )}
              />
              <span
                className={cn({
                  "hidden xl:inline": size === "md",
                  inline: size === "sm",
                })}
              >
                დამატება
              </span>
              <span className="xl:hidden">კალათაში</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
