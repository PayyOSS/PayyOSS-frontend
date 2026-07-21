const skeletonRows = Array.from({ length: 5 });
const skeletonSummary = Array.from({ length: 4 });

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-white/[0.08] ${className}`}
    />
  );
}

export default function TransectionLoader() {
  return (
    <div
      className="min-h-screen bg-[#020608] px-4 py-5 text-white sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading transactions"
    >
      <span className="sr-only">Loading transactions...</span>

      <div className="mx-auto max-w-[1500px]">
        <header>
          <Skeleton className="h-9 w-52" />
          <Skeleton className="mt-3 h-4 w-80 max-w-full" />
        </header>

        <section className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-[#0A0F12]/75">
          <div className="grid grid-cols-4 divide-x divide-white/5">
            {skeletonSummary.map((_, index) => (
              <div
                key={index}
                className="flex min-h-[82px] min-w-0 flex-col items-start justify-center gap-2 px-2 py-2 sm:min-h-[110px] sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-5"
              >
                <Skeleton className="hidden h-12 w-12 shrink-0 rounded-full sm:block" />
                <div className="w-full">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-3 h-7 w-20" />
                  <Skeleton className="mt-2 h-3 w-14" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-white/5 bg-[#080D10]/75">
          <div className="flex gap-8 border-b border-white/5 px-6 py-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-40" />
          </div>

          <div className="overflow-x-auto overscroll-x-contain">
            <div className="min-w-[760px] sm:min-w-[840px]">
            <div className="grid grid-cols-[0.85fr_0.68fr_1.05fr_0.78fr_1fr_0.9fr_20px] gap-2 border-b border-white/5 bg-white/[0.015] px-3 py-3 sm:gap-3 sm:px-4">
              {["w-35", "w-28", "w-36", "w-24", "w-30", "w-32"].map((width) => (
                <Skeleton key={width} className={`h-3 ${width}`} />
              ))}
            </div>

            {skeletonRows.map((_, index) => (
              <div
                key={index}
                className="grid min-h-17 grid-cols-[0.85fr_0.68fr_1.05fr_0.78fr_1fr_0.9fr_20px] items-center gap-2 border-b border-white/5 px-3 py-3.5 sm:gap-3 sm:px-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-7 w-24 rounded-lg" />
                <Skeleton className="h-4 w-32" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 px-5 py-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
        </section>
      </div>
    </div>
  );
}
