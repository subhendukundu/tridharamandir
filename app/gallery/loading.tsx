export default function GalleryLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-brand-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="mt-4 h-10 w-96 max-w-full rounded bg-white/10" />
          <div className="mt-4 h-5 w-[480px] max-w-full rounded bg-white/10" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl border border-brand-primary/10 bg-brand-light/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
