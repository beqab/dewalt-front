export default function ProductDetailsSkeleton() {
  return (
    <>
      {/* Breadcrumb Skeleton */}
      <nav className="customContainer bg-neutral mt-16 overflow-x-auto py-4 text-sm md:mt-0 md:bg-white md:py-4">
        <ol className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={`breadcrumb-${index}`}
              className="text-text-secondary flex items-center gap-2"
            >
              {index > 0 && (
                <span
                  className="text-text-secondary select-none"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ol>
      </nav>

      <div className="bg-neutral md:bg-background">
        <div className="mx-auto max-w-[1070px] px-[15px] py-8 pt-0 md:pt-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[410px_1fr]">
            {/* Image Slider Skeleton */}
            <div className="mx-auto w-full max-w-[410px]">
              {/* Main Image Skeleton */}
              <div className="relative mb-4 aspect-195/164 w-full animate-pulse overflow-hidden rounded-[6px] bg-gray-200 md:aspect-208/175" />

              {/* Thumbnail Carousel Skeleton */}
              <div className="relative m-auto max-w-[84%]">
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={`thumbnail-${index}`}
                      className="aspect-square h-18 min-w-0 flex-[0_0_calc(85px-0.375rem)] animate-pulse overflow-hidden rounded-sm border border-gray-200 bg-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="m-auto w-full max-w-[410px] space-y-4 md:m-0 md:max-w-none">
              {/* Product Title Skeleton */}
              <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200 md:h-9" />

              {/* Rating Skeleton */}
              <div className="flex items-center gap-2 md:mb-6">
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Price and Compare Skeleton */}
              <div className="flex items-center gap-4 md:mb-6">
                <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Product Details Skeleton */}
              <div className="space-y-2 md:mb-6">
                <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Quantity and Add to Cart Skeleton */}
              <div className="space-y-3 md:mb-6">
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
              </div>

              {/* Additional Information Skeleton */}
              <div className="border-line-color flex flex-wrap gap-2 border-t pt-4 md:gap-4">
                <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info Tab Skeleton */}
      <div className="mx-auto max-w-[1070px] px-[15px]">
        <div className="mt-8">
          {/* Tabs Skeleton */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`tab-${index}`}
                  className="h-6 w-20 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Tab Content Skeleton */}
          <div className="mt-4">
            <div className="bg-background rounded-lg p-4 md:min-h-[160px]">
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
