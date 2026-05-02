'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '~/features/auth/api/query-keys';
import { bookmarkKeys } from '~/features/bookmark/api/query-keys';
import { ratingKeys } from '~/features/rating/api/query-keys';

export async function logout(): Promise<void> {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  if (!res.ok) throw new Error('Logout failed');
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), { user: null, profile: null });
      queryClient.removeQueries({ queryKey: bookmarkKeys.all });
      queryClient.removeQueries({ queryKey: ratingKeys.all });
    },
  });
}
