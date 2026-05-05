'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkKeys } from '~/features/bookmark/api/query-keys';
import { track } from '~/lib/analytics';

export async function deleteBookmark(aniId: number): Promise<{ success: true }> {
  const res = await fetch(`/api/bookmarks?aniId=${aniId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete bookmark');
  return res.json();
}

export function useDeleteBookmarkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: (_data, aniId) => {
      track('remove_bookmark', { ani_id: aniId });
    },
    onMutate: async (aniId) => {
      await queryClient.cancelQueries({ queryKey: bookmarkKeys.list() });
      const previous = queryClient.getQueryData<{ aniIds: number[] }>(bookmarkKeys.list());
      queryClient.setQueryData<{ aniIds: number[] }>(bookmarkKeys.list(), (old) => ({
        aniIds: (old?.aniIds ?? []).filter((id) => id !== aniId),
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
