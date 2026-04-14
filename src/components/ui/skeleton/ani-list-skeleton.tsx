import { Skeleton } from '~/components/ui/skeleton';

export default function AniListSkeleton() {
  return (
    <div className="w-full grid gap-4 grid-cols-list px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
      {Array.from({ length: 20 }, (_, index) => (
        <div
          key={index}
          className="w-full rounded-lg overflow-hidden border border-outline-variant/50"
        >
          {/* Poster only — matches Netflix-style AniItem */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <Skeleton className="absolute inset-0 rounded-none bg-surface-container" />
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-on-surface/5 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}
