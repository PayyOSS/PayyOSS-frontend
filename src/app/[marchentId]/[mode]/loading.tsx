export default function MerchantRouteLoading() {
  return (
    <div
      className="flex min-h-full items-center justify-center bg-[#0b0d0f] px-6 py-16"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative grid size-12 place-items-center rounded-2xl border border-[#b8ff3c]/20 bg-[#b8ff3c]/5">
          <div className="size-6 animate-spin rounded-full border-2 border-[#b8ff3c]/20 border-t-[#b8ff3c]" />
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(184,255,60,0.08)]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white">Loading workspace</p>
          <p className="mt-1 text-xs text-zinc-500">Preparing your merchant data...</p>
        </div>
      </div>
    </div>
  );
}
