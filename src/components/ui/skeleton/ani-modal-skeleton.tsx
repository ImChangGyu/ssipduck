import { Skeleton } from '~/components/ui/skeleton';

export default function AniModalSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-hidden>
      {/* Scrim */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-lg" />

      {/* Shell */}
      <div className="relative z-10 w-full max-w-[900px] max-h-[90vh] overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant shadow-elevation-4">

        {/* Hero skeleton */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Skeleton className="absolute inset-0 rounded-none bg-surface-container" />
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-on-surface/5 to-transparent" />
        </div>

        {/* Content skeleton */}
        <div className="px-6 py-6 md:px-8 flex flex-col gap-4">
          <div className="flex gap-5 items-start">
            {/* Poster */}
            <div className="hidden sm:block flex-shrink-0 w-[120px] -mt-16">
              <Skeleton className="aspect-[2/3] bg-surface-container" />
            </div>
            {/* Title + genres */}
            <div className="flex-1 flex flex-col gap-3">
              <Skeleton className="h-8 bg-surface-container w-3/4" />
              <div className="flex gap-2">
                {[60, 80, 56].map((w) => (
                  <Skeleton key={w} className="h-7 rounded-full bg-surface-container" style={{ width: w }} />
                ))}
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 bg-surface-container" />
            <Skeleton className="h-4 bg-surface-container w-11/12" />
            <Skeleton className="h-4 bg-surface-container w-9/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
