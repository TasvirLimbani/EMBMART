export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title Skeleton */}
      <div className="mb-6 h-6 w-48 rounded-md bg-muted animate-pulse" />

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-3 shadow-sm"
          >
            {/* Image */}
            <div className="mb-3 aspect-square w-full rounded-lg bg-muted animate-pulse" />

            {/* Title */}
            <div className="mb-2 h-4 w-full rounded bg-muted animate-pulse" />
            <div className="mb-3 h-4 w-2/3 rounded bg-muted animate-pulse" />

            {/* Price */}
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
