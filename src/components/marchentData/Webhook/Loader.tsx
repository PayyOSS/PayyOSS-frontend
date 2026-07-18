export default function WebhookLoader() {
  return (
    <div
      className="min-h-screen bg-[#020608] p-4 text-white sm:p-6 lg:p-8"
      role="status"
      aria-label="Loading webhook details"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <section className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(9,16,20,0.96),rgba(3,8,10,0.98))] p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="h-7 w-48 rounded-lg bg-white/10" />
              <div className="h-4 w-72 max-w-full rounded-md bg-white/6" />
            </div>

            <div className="flex gap-3">
              <div className="h-10 w-24 rounded-xl bg-white/8" />
              <div className="h-10 w-24 rounded-xl bg-red-500/10" />
            </div>
          </div>

          <div className="mt-6 grid overflow-hidden rounded-2xl border border-white/10 bg-[#050A0D]/80 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`flex gap-4 p-5 sm:p-6 ${
                  index < 2 ? "border-b border-white/10" : ""
                } ${index % 2 === 0 ? "md:border-r md:border-white/10" : ""}`}
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-[#B8FF3C]/8" />
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-3 w-20 rounded bg-white/[0.06]" />
                  <div className="h-5 w-3/4 rounded-md bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(9,16,20,0.96),rgba(3,8,10,0.98))] p-5 sm:p-6">
          <div className="h-6 w-44 rounded-lg bg-white/10" />
          <div className="mt-3 h-4 w-80 max-w-full rounded-md bg-white/[0.06]" />

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="h-12 bg-white/[0.025]" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[1.2fr_1fr_0.6fr_1.8fr] gap-5 border-t border-white/10 px-5 py-5"
              >
                <div className="h-4 rounded bg-white/10" />
                <div className="h-7 w-24 rounded-lg bg-[#B8FF3C]/8" />
                <div className="h-4 rounded bg-white/[0.08]" />
                <div className="h-4 rounded bg-white/[0.06]" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <span className="sr-only">Loading webhook details...</span>
    </div>
  );
}
