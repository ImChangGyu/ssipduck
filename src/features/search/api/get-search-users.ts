'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

export interface UserSearchItem {
  id: string;
  nickname: string;
  bio: string | null;
}

interface SearchUsersResponse {
  items: UserSearchItem[];
  hasMore: boolean;
}

export async function getSearchUsers({
  q,
  page,
}: {
  q: string;
  page: number;
}): Promise<SearchUsersResponse> {
  const res = await fetch(`/api/search/users?q=${encodeURIComponent(q)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to search users');
  return res.json();
}

export function useSearchUsersInfiniteQuery(q: string) {
  return useInfiniteQuery({
    queryKey: ['search', 'users', q],
    queryFn: ({ pageParam }) => getSearchUsers({ q, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    enabled: q.trim().length > 0,
  });
}
