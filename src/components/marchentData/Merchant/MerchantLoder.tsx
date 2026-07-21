const informationRows = Array.from({ length: 6 });

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-white/[0.08] ${className}`}
    />
  );
}

export default function MerchantLoder() {
  return (
    <div
      className="min-h-screen bg-[#02070A] px-4 py-5 text-white sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading merchant details"
    >
      <span className="sr-only">Loading merchant details...</span>

      <div className="mx-auto max-w-362.5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-30" />
        </div>

        <section className="mt-4 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(10,17,21,0.96),rgba(4,9,12,0.98))] px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Skeleton className="h-20 w-20 shrink-0 rounded-full sm:h-22 sm:w-22" />
              <div className="flex w-full flex-col items-center sm:items-start">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-7 w-42" />
                  <Skeleton className="h-7 w-16 rounded-lg" />
                </div>
                <Skeleton className="mt-3 h-4 w-52" />
                <Skeleton className="mt-2 h-4 w-44" />
              </div>
            </div>

            <div className="flex gap-3">
              <Skeleton className="h-10 flex-1 rounded-xl sm:w-22 sm:flex-none" />
              <Skeleton className="h-10 flex-1 rounded-xl sm:w-24 sm:flex-none" />
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(10,17,21,0.96),rgba(4,9,12,0.98))] p-5 sm:p-7 lg:p-8">
          <Skeleton className="h-7 w-54" />
          <Skeleton className="mt-3 h-4 w-80 max-w-full" />

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#050A0D]/70">
            {informationRows.map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-5 border-b border-white/8 px-5 py-4 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
                  <Skeleton className="h-4 w-22" />
                </div>
                <Skeleton className="h-4 w-36 sm:w-52" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/8 bg-[#050A0D]/70 px-5 py-4">
            <Skeleton className="h-4 w-26" />
            <Skeleton className="h-4 w-44" />
          </div>
        </section>
      </div>
    </div>
  );
}
