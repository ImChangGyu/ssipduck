'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingKeys } from '~/features/rating/api/query-keys';
import { commentKeys } from '~/features/comment/api/query-keys';

export async function deleteRating(aniId: number): Promise<{ success: true }> {
  const res = await fetch(`/api/ratings?aniId=${aniId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete rating');
  return res.json();
}

export function useDeleteRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onMutate: async (aniId) => {
      await queryClient.cancelQueries({ queryKey: ratingKeys.list() });
      const previous = queryClient.getQueryData<{ ratings: { aniId: number; score: number }[] }>(ratingKeys.list());
      queryClient.setQueryData<{ ratings: { aniId: number; score: number }[] }>(ratingKeys.list(), (old) => ({
        ratings: (old?.ratings ?? []).filter((r) => r.aniId !== aniId),
      }));
      return { previous };
    },
    onError: (_err, _aniId, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(ratingKeys.list(), context.previous);
      }
    },
    onSettled: (_data, _err, aniId) => {
      queryClient.invalidateQueries({ queryKey: ratingKeys.list() });
      queryClient.invalidateQueries({ queryKey: ratingKeys.stats([aniId]) });
      queryClient.invalidateQueries({ queryKey: commentKeys.list(aniId) });
    },
  });
}
