'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentKeys } from '~/features/comment/api/query-keys';
import { track } from '~/lib/analytics';

interface UpsertCommentPayload {
  aniId: number;
  content: string;
}

export async function upsertComment(payload: UpsertCommentPayload): Promise<{ success: true }> {
  const res = await fetch('/api/comments', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to upsert comment');
  return res.json();
}

export function useUpsertCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertComment,
    onSuccess: (_data, { aniId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(aniId) });
      track('comment_ani', { ani_id: aniId });
    },
  });
}
