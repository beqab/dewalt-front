export default function SearchSkeleton() {
  return (
    <div className="bg-background absolute top-full left-0 z-50 mt-2 max-h-[60vh] w-full overflow-y-auto rounded-lg border border-gray-200 shadow-lg md:max-h-[500px] md:w-[500px]">
      <div className="p-2">
        <div className="space-y-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="h-16 w-16 shrink-0 animate-pulse rounded-md bg-gray-200" />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-4 w-16 shrink-0 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
