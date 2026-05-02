'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { commentKeys } from '~/features/comment/api/query-keys';
import type { CommentItem } from '~/features/ani/types/comment';

interface CommentsResponse {
  comments: CommentItem[];
}

export async function getComments(aniId: number): Promise<CommentsResponse> {
  const res = await fetch(`/api/comments?aniId=${aniId}`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export function useCommentsQuery(aniId: number) {
  return useSuspenseQuery({
    queryKey: commentKeys.list(aniId),
    queryFn: () => getComments(aniId),
  });
}
