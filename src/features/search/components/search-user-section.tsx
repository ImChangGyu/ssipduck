'use client';

import { useSearchUsersInfiniteQuery } from '~/features/search/api/get-search-users';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import SearchUserItem from '~/features/search/components/search-user-item';

interface SearchUserSectionProps {
  q: string;
  onClose: () => void;
}

export default function SearchUserSection({ q, onClose }: SearchUserSectionProps) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchUsersInfiniteQuery(q);

  const users = data?.pages.flatMap((p) => p.items) ?? [];

  if (isLoading && users.length === 0) {
    return (
      <div className="px-4 pt-1 pb-3 flex flex-col gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <Skeleton className="size-8 rounded-full bg-surface-container shrink-0" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3.5 w-24 rounded bg-surface-container" />
              <Skeleton className="h-3 w-40 rounded bg-surface-container" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && users.length === 0) {
    return (
      <p className="px-4 py-3 text-body-sm text-on-surface-variant">
        유저 검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <div className="px-4 pt-1 pb-3 flex flex-col gap-1">
      {users.map((user) => (
        <SearchUserItem key={user.id} user={user} onClick={onClose} />
      ))}
      {hasNextPage && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 border-outline-variant text-on-surface-variant"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </Button>
      )}
    </div>
  );
}
