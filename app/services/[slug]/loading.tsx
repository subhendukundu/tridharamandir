export default function ServiceLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="flex min-h-[60vh] items-center bg-brand-dark">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="max-w-3xl space-y-5">
            <div className="h-4 w-28 rounded bg-white/10" />
            <div className="h-12 w-80 max-w-full rounded bg-white/10" />
            <div className="h-5 w-[520px] max-w-full rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-brand-primary/10 bg-brand-light/10 p-6"
              >
                <div className="h-6 w-48 rounded bg-brand-primary/10" />
                <div className="mt-4 h-4 w-full rounded bg-brand-primary/5" />
                <div className="mt-2 h-4 w-3/4 rounded bg-brand-primary/5" />
              </div>
            ))}
          </div>
          <div className="rounded-[28px] border border-brand-primary/10 bg-brand-light/10 p-6 h-64" />
        </div>
      </div>
    </div>
  );
}
