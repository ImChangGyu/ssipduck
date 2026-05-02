'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingKeys } from '~/features/rating/api/query-keys';
import { commentKeys } from '~/features/comment/api/query-keys';

interface UpsertRatingPayload {
  aniId: number;
  score: number;
}

export async function upsertRating(payload: UpsertRatingPayload): Promise<{ success: true }> {
  const res = await fetch('/api/ratings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to upsert rating');
  return res.json();
}

export function useUpsertRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertRating,
    onMutate: async ({ aniId, score }) => {
      await queryClient.cancelQueries({ queryKey: ratingKeys.list() });
      const previous = queryClient.getQueryData<{ ratings: { aniId: number; score: number }[] }>(ratingKeys.list());
      queryClient.setQueryData<{ ratings: { aniId: number; score: number }[] }>(ratingKeys.list(), (old) => {
        const filtered = (old?.ratings ?? []).filter((r) => r.aniId !== aniId);
        return { ratings: [...filtered, { aniId, score }] };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(ratingKeys.list(), context.previous);
      }
    },
    onSettled: (_data, _err, { aniId }) => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.list() });
      queryClient.invalidateQueries({ queryKey: ratingKeys.stats([aniId]) });
      queryClient.invalidateQueries({ queryKey: commentKeys.list(aniId) });
    },
  });
}
