export default function LoadingPage() {
  return (
    <div className="bg-neutral min-h-screen py-10 pt-0 md:bg-white">
      <div className="customContainer">
        {/* Breadcrumb skeleton */}
        <div className="mt-6 mb-6 flex items-center gap-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className="border-line-color overflow-hidden rounded-lg border bg-[#EEE] p-4 shadow-sm"
            >
              <div className="relative mb-3 aspect-368/272 w-full animate-pulse overflow-hidden rounded-lg bg-gray-200" />
              <div className="space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-11/12 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-10 w-full animate-pulse rounded bg-gray-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-9 w-9 animate-pulse rounded bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
