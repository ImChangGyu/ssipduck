'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import AniListSkeleton from '~/components/ui/skeleton/ani-list-skeleton';
import SearchAni from '~/features/ani/components/search-ani';
import { useAniFilterParams } from '~/features/ani/hooks/use-ani-filter-params';

const AniModalSkeleton = dynamic(
  () => import('~/components/ui/skeleton/ani-modal-skeleton')
);
const AniList = dynamic(() => import('~/features/ani/components/ani-list'), {
  loading: () => <AniListSkeleton />,
});
const AniModal = dynamic(() => import('~/features/ani/components/ani-modal'), {
  loading: () => <AniModalSkeleton />,
});
const AniHero = dynamic(() => import('~/features/ani/components/ani-hero'));

function AniHeroSkeleton() {
  return (
    <div
      className="relative w-full bg-surface-container-lowest overflow-hidden"
      style={{ minHeight: 'min(65vh, 560px)' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-on-surface/5 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 flex flex-col gap-4 max-w-2xl">
        <Skeleton className="h-4 w-24 rounded-full bg-surface-container" />
        <Skeleton className="h-9 w-3/4 bg-surface-container" />
        <Skeleton className="h-5 w-full bg-surface-container" />
        <div className="flex gap-2">
          {[80, 64, 72].map((w) => (
            <Skeleton key={w} className="h-7 rounded-full bg-surface-container" style={{ width: w }} />
          ))}
        </div>
        <Skeleton className="h-10 w-32 rounded-full bg-surface-container" />
      </div>
    </div>
  );
}

export default function Ani() {
  const { type, q, setType, setQ } = useAniFilterParams();
  const searchParams = useSearchParams();
  const aniId = searchParams.get('ani-id');

  return (
    <>
      {/* Hero: only when not searching */}
      {!q && type !== 'favorite' && (
        <Suspense fallback={<AniHeroSkeleton />}>
          <AniHero type={type} />
        </Suspense>
      )}

      {/* Sticky search + filter */}
      <div className="sticky top-16 z-20 bg-background/85 backdrop-blur-md border-b border-outline-variant/50">
        <SearchAni
          q={q}
          type={type}
          onQueryChange={setQ}
          onTypeChange={setType}
        />
      </div>

      {/* Grid */}
      <Suspense fallback={<AniListSkeleton />}>
        <AniList variableType={type} searchKeyword={q || undefined} />
      </Suspense>

      {aniId && <AniModal aniId={aniId} />}
    </>
  );
}
