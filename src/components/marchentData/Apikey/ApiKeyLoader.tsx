const detailSkeletons = Array.from({ length: 6 });
const featureSkeletons = Array.from({ length: 3 });

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-white/[0.08] ${className}`}
    />
  );
}

export default function ApiKeyLoader() {
  return (
    <div
      className="min-h-screen bg-[#0B0D0F] px-4 py-6 text-white sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading API key"
    >
      <span className="sr-only">Loading API key...</span>

      <div className="mb-10 flex items-start justify-between gap-5">
        <div>
          <Skeleton className="h-9 w-36 sm:h-10" />
          <Skeleton className="mt-3 h-4 w-76 max-w-[65vw]" />
        </div>
        <Skeleton className="h-10 w-32 shrink-0 rounded-2xl" />
      </div>

      <div className="overflow-hidden rounded-[30px] border border-[#1A2A32] bg-[#14171C]/60 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-5 border-b border-white/5 p-5 sm:p-8">
          <div className="flex min-w-0 gap-4 sm:gap-5">
            <Skeleton className="h-12 w-12 shrink-0 rounded-2xl sm:h-14 sm:w-14" />
            <div className="min-w-0 pt-1">
              <Skeleton className="h-6 w-40 sm:w-48" />
              <Skeleton className="mt-3 h-4 w-72 max-w-[45vw]" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 shrink-0 rounded-full" />
        </div>

        <div className="grid grid-cols-1 divide-y divide-white/5 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-3">
          {detailSkeletons.map((_, index) => (
            <div key={index} className="min-h-25 p-6">
              <Skeleton className="h-3 w-24" />
              <div className="mt-4 flex items-center gap-2">
                {index > 2 && <Skeleton className="h-4 w-4 rounded-full" />}
                <Skeleton
                  className={
                    index === 2
                      ? "h-6 w-36 rounded-full"
                      : index === 0
                        ? "h-5 w-52 max-w-full"
                        : "h-5 w-28"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featureSkeletons.map((_, index) => (
          <div
            key={index}
            className="rounded-[28px] border border-[#1A2A32] bg-[#14171C]/50 p-7 backdrop-blur-xl"
          >
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="mt-7 h-6 w-40" />
            <Skeleton className="mt-4 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
