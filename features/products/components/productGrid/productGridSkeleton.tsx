export default function ProductGridSkeleton() {
  return (
    <div className="flex-1">
      {/* Header Skeleton */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Product Grid Skeleton - matches ProductCard layout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="relative min-w-0 px-0 md:px-0"
          >
            <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-white p-3 shadow-sm md:p-4">
              {/* Image Skeleton */}
              <div className="relative mb-3 aspect-square w-full animate-pulse overflow-hidden rounded-lg bg-gray-200" />

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
        ))}
      </div>
    </div>
  );
}
