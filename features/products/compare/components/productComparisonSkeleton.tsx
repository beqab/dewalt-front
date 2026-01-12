export default function ProductComparisonSkeleton() {
  return (
    <>
      {/* Mobile Skeleton */}
      <div className="w-full md:hidden">
        {/* Header Skeleton */}
        <div className="mb-4 flex items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Products Row Skeleton */}
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col">
            <div className="flex">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`mobile-product-${index}`}
                  className="relative mr-4 min-w-[220px] shrink-0"
                >
                  <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-white p-4 shadow-sm">
                    {/* Delete Button Skeleton */}
                    <div className="absolute right-2 top-2 z-10 h-6 w-6 animate-pulse rounded-full bg-gray-200" />

                    {/* Image Skeleton */}
                    <div className="relative mb-3 aspect-square h-[190px] w-full animate-pulse overflow-hidden rounded-lg bg-gray-200" />

                    {/* Product Info Skeleton */}
                    <div className="flex flex-1 flex-col">
                      {/* Name and Code Skeleton */}
                      <div className="text-dark-secondary-100 mb-2 h-12 w-full animate-pulse rounded bg-gray-200" />

                      {/* Price Skeleton */}
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                      </div>

                      {/* Add to Cart Button Skeleton */}
                      <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Details Label Skeleton */}
            <div className="py-6">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Specs Row Skeleton */}
            <div className="flex">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`mobile-specs-${index}`}
                  className="border-line-color mr-2 min-w-[220px] border-r pr-2 last:border-r-0"
                >
                  <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, specIndex) => (
                      <div
                        key={`mobile-spec-${index}-${specIndex}`}
                        className="border-line-color border-b pb-3 last:border-0"
                      >
                        <div className="mb-1 h-4 w-24 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden w-full md:block">
        <div className="overflow-visible">
          <div
            className="inline-grid gap-px bg-[#D2D2D2]"
            style={{
              gridTemplateColumns: "repeat(4, minmax(280px, 1fr))",
              minWidth: "1120px",
            }}
          >
            {/* Label Column - პროდუქტი */}
            <div className="flex items-center justify-between bg-white p-4 pt-0">
              <div className="flex w-full flex-col items-center justify-center gap-6">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            {/* Product Columns Skeleton */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`desktop-product-${index}`} className="bg-white p-4 pt-0">
                <div className="border-line-color relative flex h-full flex-col rounded-lg border bg-white p-4 shadow-sm">
                  {/* Delete Button Skeleton */}
                  <div className="absolute right-2 top-2 z-10 h-6 w-6 animate-pulse rounded-full bg-gray-200" />

                  {/* Image Skeleton */}
                  <div className="relative mb-3 aspect-square h-[190px] w-full animate-pulse overflow-hidden rounded-lg bg-gray-200" />

                  {/* Product Info Skeleton */}
                  <div className="flex flex-1 flex-col">
                    {/* Name and Code Skeleton */}
                    <div className="text-dark-secondary-100 mb-2 h-12 w-full animate-pulse rounded bg-gray-200" />

                    {/* Price Skeleton */}
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                    </div>

                    {/* Add to Cart Button Skeleton */}
                    <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}

            {/* Label Column - დეტალები */}
            <div className="flex w-full justify-center bg-white p-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Specs Columns Skeleton */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`desktop-specs-${index}`}
                className="bg-white p-4"
              >
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, specIndex) => (
                    <div
                      key={`desktop-spec-${index}-${specIndex}`}
                      className="border-line-color border-b pb-3 last:border-0"
                    >
                      <div className="mb-1 h-4 w-24 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

