export default function FilterSkeleton() {
  return (
    <>
      {/* Desktop Filter Skeleton */}
      <aside className="hidden w-full shrink-0 md:block md:w-56">
        <div className="w-full shrink-0 md:w-56">
          <div className="space-y-6 border-[#D2D2D2] md:mr-0 md:border-r md:pr-6">
            {/* Price Filter Skeleton */}
            <div>
              <div className="mb-6 h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="space-y-3">
                <div className="h-2 w-full animate-pulse rounded bg-gray-200" />
                <div className="flex items-center justify-between">
                  <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Manufacturers Filter Skeleton */}
            <div>
              <div className="mb-4 h-4 w-28 animate-pulse rounded bg-gray-200" />
              <div className="space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Promotional Banner Skeleton */}
          <div className="hidden space-y-4 pr-6 md:block">
            <div className="bg-background-secondary relative mt-18 overflow-hidden rounded-lg">
              <div className="relative h-48 w-full animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Filter Skeleton */}
      <div className="relative z-20 md:hidden">
        <div className="mb-4 h-10 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </>
  );
}
