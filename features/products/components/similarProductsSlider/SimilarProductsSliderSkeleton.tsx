import Carousel from "@/components/carousel";

function ProductCardSkeleton() {
  return (
    <div className="relative min-w-0 flex-[0_0_calc(66.666%-0.5rem)] px-2 md:min-w-[240px] md:flex-[0_0_calc(25%)]">
      <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-white p-3 shadow-sm md:p-4">
        {/* Image Skeleton */}
        <div className="relative mb-3 aspect-square h-[190px] w-full animate-pulse overflow-hidden rounded-lg bg-gray-200" />

        {/* Product Info Skeleton */}
        <div className="flex flex-1 flex-col">
          {/* Name and Code Skeleton */}
          <div className="mb-2 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Description Skeleton */}
          <div className="mb-4 space-y-1">
            <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Price and Button Skeleton */}
          <div className="mt-auto flex items-center justify-between">
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SimilarProductsSliderSkeleton() {
  return (
    <Carousel>
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductCardSkeleton key={`skeleton-${index}`} />
      ))}
    </Carousel>
  );
}
