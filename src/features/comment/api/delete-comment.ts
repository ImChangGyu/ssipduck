'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentKeys } from '~/features/comment/api/query-keys';

export async function deleteComment(aniId: number): Promise<{ success: true }> {
  const res = await fetch(`/api/comments?aniId=${aniId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete comment');
  return res.json();
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_data, aniId) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(aniId) });
    },
  });
}
