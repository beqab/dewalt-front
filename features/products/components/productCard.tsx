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
      className="relative min-w-0 flex-[0_0_calc(66.666%-0.5rem)] md:flex-[0_0_calc(25%-0.75rem)]"
    >
      <div className="relative flex h-full flex-col rounded-lg border border-line-color bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        {/* Discount Badge */}
        {discount && (
          <div className="absolute left-2 top-2 z-10 rounded bg-pink-500 px-2 py-1 text-xs font-bold text-white">
            {discount}%
          </div>
        )}

        {/* Compare Checkbox */}
        <div className="absolute right-2 top-2 z-10">
          <label className="flex cursor-pointer items-center gap-1 text-xs text-dark-secundary-70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span>შედარება</span>
          </label>
        </div>

        {/* Product Image */}
        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
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
          <h3 className="mb-1 text-sm font-semibold text-dark-secundary-100">
            {name} {code}
          </h3>
          <p className="mb-3 text-xs text-dark-secundary-70">{description}</p>

          {/* Price */}
          <div className="mt-auto">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg font-bold text-dark-secundary-100">
                {price} GEL
              </span>
              {originalPrice && (
                <span className="text-sm text-dark-secundary-70 line-through">
                  {product.originalPrice} GEL
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              className="w-full rounded-sm bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
            >
              კალათაში
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
