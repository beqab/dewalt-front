import { BucketIcon } from "@/components/icons/bucketIcon";
import Image from "next/image";

interface Product {
  id: number;
  image: string;
  name: string;
  code: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
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
      key={id}
      className="relative min-w-0 flex-[0_0_calc(66.666%-0.5rem)] px-2 md:flex-[0_0_calc(25%)]"
    >
      <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        {/* Discount Badge */}
        {discount && (
          <div className="bg-discount-BG text-discount-text absolute top-2 left-2 z-10 rounded px-1 py-2 text-xs font-normal">
            {discount}%
          </div>
        )}

        {/* Compare Checkbox */}
        <div className="absolute top-2 right-2 z-10">
          <label className="text-dark-secundary-70 flex cursor-pointer items-center gap-1 text-xs">
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
          <h3 className="text-dark-secundary-100 mb-2 h-12 text-sm font-bold md:h-14 md:text-base">
            {name} {code}
          </h3>
          <p className="text-text-secondary mb-4 text-xs">{description}</p>

          {/* Price */}
          <div className="mt-auto xl:flex xl:items-center xl:justify-between">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-dark-secundary-100">{price} GEL</span>
              {originalPrice && (
                <span className="text-text-secondary text-xs line-through">
                  {product.originalPrice} GEL
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              className="bg-primary hover:bg-primary/90 text-dark-secundary-100 flex h-10 w-full items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors xl:max-w-[98px]"
            >
              <BucketIcon className="fill-dark-secundary-100 xl:hidden" />
              <span>კალათაში</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
