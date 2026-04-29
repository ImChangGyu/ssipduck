'use client';

import { useEffect, useRef } from 'react';
import { useSearchAnis } from '~/features/search/api/get-search-anis';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import SearchAniItem from '~/features/search/components/search-ani-item';

interface SearchAniSectionProps {
  q: string;
  onClose: () => void;
}

export default function SearchAniSection({ q, onClose }: SearchAniSectionProps) {
  const { anis, hasNextPage, loading, loadMore } = useSearchAnis(q);
  const pageRef = useRef(1);

  useEffect(() => {
    pageRef.current = 1;
  }, [q]);

  function handleLoadMore() {
    pageRef.current += 1;
    loadMore(pageRef.current);
  }

  if (loading && anis.length === 0) {
    return (
      <div className="px-4 pt-1 pb-3">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg bg-surface-container" />
          ))}
        </div>
      </div>
    );
  }

  if (!loading && anis.length === 0) {
    return (
      <p className="px-4 py-3 text-body-sm text-on-surface-variant">
        애니 검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <div className="px-4 pt-1 pb-3 flex flex-col gap-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {anis.map((ani, i) => (
          <SearchAniItem key={`search-ani-${ani.id}-${i}`} ani={ani} onClose={onClose} />
        ))}
      </div>
      {hasNextPage && (
        <Button
          variant="outline"
          size="sm"
          className="w-full border-outline-variant text-on-surface-variant"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? '로딩 중...' : '더 보기'}
        </Button>
      )}
    </div>
  );
}
