const featureSkeletons = Array.from({ length: 4 });
const tableColumns = Array.from({ length: 9 });

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-white/[0.08] ${className}`}
    />
  );
}

export default function AssetLoader() {
  return (
    <div
      className="flex min-h-screen flex-col text-white"
      role="status"
      aria-label="Loading assets"
    >
      <span className="sr-only">Loading assets...</span>

      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-5">
          <div>
            <Skeleton className="h-9 w-32 sm:h-10" />
            <Skeleton className="mt-3 h-4 w-72 max-w-[70vw]" />
          </div>
          <Skeleton className="h-11 w-28 shrink-0 rounded-2xl sm:w-34" />
        </div>

        <div className="hidden overflow-hidden rounded-[28px] border border-white/5 bg-[#14171C]/50 backdrop-blur-xl lg:block">
          <div className="min-w-275">
            <div className="grid grid-cols-[70px_100px_2fr_130px_100px_90px_110px_110px_90px] gap-4 border-b border-white/5 px-6 py-4">
              {tableColumns.map((_, index) => (
                <Skeleton key={index} className="h-3 w-4/5" />
              ))}
            </div>
            <div className="grid min-h-18 grid-cols-[70px_100px_2fr_130px_100px_90px_110px_110px_90px] items-center gap-4 px-6 py-5">
              {tableColumns.map((_, index) => (
                <Skeleton
                  key={index}
                  className={index === 2 ? "h-4 w-full" : "h-6 w-4/5 rounded-full"}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/5 bg-[#14171C]/50 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-3 p-5">
            <div className="flex justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <div><Skeleton className="h-3 w-18" /><Skeleton className="mt-2 h-4 w-24" /></div>
              <div><Skeleton className="h-3 w-12" /><Skeleton className="mt-2 h-4 w-14" /></div>
            </div>
            <div className="flex justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <div><Skeleton className="h-3 w-18" /><Skeleton className="mt-2 h-6 w-16 rounded-full" /></div>
              <div><Skeleton className="h-3 w-12" /><Skeleton className="mt-2 h-4 w-10" /></div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <Skeleton className="h-3 w-22" />
              <Skeleton className="mt-2 h-4 w-full" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3">
                  <Skeleton className="mx-auto h-3 w-12" />
                  <Skeleton className="mx-auto mt-2 h-5 w-14 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 px-5 py-3">
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featureSkeletons.map((_, index) => (
            <div key={index} className="flex min-h-40 flex-col rounded-3xl border border-white/5 bg-[#14171C]/50 p-5 sm:min-h-42.5 sm:p-6">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="mt-5 h-5 w-36" />
              <Skeleton className="mt-4 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-4/5" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
