'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ratingKeys } from '~/features/rating/api/query-keys';

interface RatingStatItem {
  aniId: number;
  avgScore: number;
  ratingCount: number;
}

interface RatingsStatsResponse {
  stats: RatingStatItem[];
}

export async function getRatingsStats(aniIds: number[]): Promise<RatingsStatsResponse> {
  const res = await fetch(`/api/ratings/stats?aniIds=${aniIds.join(',')}`);
  if (!res.ok) throw new Error('Failed to fetch ratings stats');
  return res.json();
}

export function useRatingsStatsQuery(aniIds: number[]) {
  const sortedIds = [...new Set(aniIds)].sort((a, b) => a - b);

  return useSuspenseQuery({
    queryKey: ratingKeys.stats(sortedIds),
    queryFn: () =>
      sortedIds.length === 0
        ? Promise.resolve({ stats: [] })
        : getRatingsStats(sortedIds),
    select: (data) => new Map(data.stats.map((s) => [s.aniId, { avgScore: s.avgScore, ratingCount: s.ratingCount }])),
  });
}
