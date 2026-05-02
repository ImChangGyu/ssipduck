'use client';

import { useQuery } from '@tanstack/react-query';
import { ratingKeys } from '~/features/rating/api/query-keys';

interface RatingItem {
  aniId: number;
  score: number;
}

interface RatingsResponse {
  ratings: RatingItem[];
}

export async function getRatings(): Promise<RatingsResponse> {
  const res = await fetch('/api/ratings');
  if (!res.ok) throw new Error('Failed to fetch ratings');
  return res.json();
}

export function useRatingsQuery({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: ratingKeys.list(),
    queryFn: getRatings,
    enabled,
    select: (data) => new Map(data.ratings.map((r) => [r.aniId, r.score])),
  });
}

export function useMyRating(aniId: number, enabled: boolean) {
  const { data: ratingsMap } = useRatingsQuery({ enabled });
  return ratingsMap?.get(aniId);
}
