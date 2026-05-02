'use client';

import { useQuery } from '@tanstack/react-query';
import { bookmarkKeys } from '~/features/bookmark/api/query-keys';

interface BookmarksResponse {
  aniIds: number[];
}

export async function getBookmarks(): Promise<BookmarksResponse> {
  const res = await fetch('/api/bookmarks');
  if (!res.ok) throw new Error('Failed to fetch bookmarks');
  return res.json();
}

export function useBookmarksQuery({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: bookmarkKeys.list(),
    queryFn: getBookmarks,
    enabled,
    select: (data) => new Set(data.aniIds),
  });
}

export function useIsBookmarked(aniId: number, enabled: boolean) {
  const { data: bookmarkSet } = useBookmarksQuery({ enabled });
  return bookmarkSet?.has(aniId) ?? false;
}
