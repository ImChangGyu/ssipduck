'use client';

import { useState, useEffect, useRef } from 'react';

export interface UserSearchItem {
  id: string;
  nickname: string;
  bio: string | null;
}

export function useSearchUsers(q: string) {
  const [users, setUsers] = useState<UserSearchItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);

  useEffect(() => {
    if (!q) {
      setUsers([]);
      setHasMore(false);
      return;
    }

    pageRef.current = 1;
    setLoading(true);

    fetch(`/api/search/users?q=${encodeURIComponent(q)}&page=1`)
      .then((r) => r.json())
      .then(({ items, hasMore: more }: { items: UserSearchItem[]; hasMore: boolean }) => {
        setUsers(items);
        setHasMore(more);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [q]);

  function loadMore() {
    if (!q || !hasMore || loading) return;
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    setLoading(true);

    fetch(`/api/search/users?q=${encodeURIComponent(q)}&page=${nextPage}`)
      .then((r) => r.json())
      .then(({ items, hasMore: more }: { items: UserSearchItem[]; hasMore: boolean }) => {
        setUsers((prev) => {
          const existingIds = new Set(prev.map((u) => u.id));
          const newItems = items.filter((u: UserSearchItem) => !existingIds.has(u.id));
          return [...prev, ...newItems];
        });
        setHasMore(more);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  return { users, hasMore, loading, loadMore };
}
