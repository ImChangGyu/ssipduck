'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkKeys } from '~/features/bookmark/api/query-keys';
import { track } from '~/lib/analytics';

export async function addBookmark(aniId: number): Promise<{ success: true }> {
  const res = await fetch('/api/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ aniId }),
  });
  if (!res.ok) throw new Error('Failed to add bookmark');
  return res.json();
}

export function useAddBookmarkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookmark,
    onSuccess: (_data, aniId) => {
      track('add_bookmark', { ani_id: aniId });
    },
    onMutate: async (aniId) => {
      await queryClient.cancelQueries({ queryKey: bookmarkKeys.list() });
      const previous = queryClient.getQueryData<{ aniIds: number[] }>(bookmarkKeys.list());
      queryClient.setQueryData<{ aniIds: number[] }>(bookmarkKeys.list(), (old) => ({
        aniIds: [...(old?.aniIds ?? []), aniId],
      }));
      return { previous };
    },
    onError: (_err, _aniId, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(bookmarkKeys.list(), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.list() });
    },
  });
}
