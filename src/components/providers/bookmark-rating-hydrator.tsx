'use client';

import { useEffect } from 'react';
import { useAuthStore } from '~/store/auth';
import { useBookmarkStore } from '~/store/bookmark';
import { useRatingStore } from '~/store/rating';

export function BookmarkRatingHydrator() {
  const user = useAuthStore((s) => s.user);
  const hydrateBookmarks = useBookmarkStore((s) => s.hydrate);
  const resetBookmarks = useBookmarkStore((s) => s.reset);
  const hydrateRatings = useRatingStore((s) => s.hydrate);
  const resetRatings = useRatingStore((s) => s.reset);

  useEffect(() => {
    if (!user) {
      resetBookmarks();
      resetRatings();
      return;
    }

    fetch('/api/bookmarks')
      .then((r) => r.json())
      .then((d) => { if (d.aniIds) hydrateBookmarks(d.aniIds); })
      .catch(() => {});

    fetch('/api/ratings')
      .then((r) => r.json())
      .then((d) => { if (d.ratings) hydrateRatings(d.ratings); })
      .catch(() => {});
  }, [user, hydrateBookmarks, hydrateRatings, resetBookmarks, resetRatings]);

  return null;
}
