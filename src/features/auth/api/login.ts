'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '~/features/auth/api/query-keys';
import { bookmarkKeys } from '~/features/bookmark/api/query-keys';
import { ratingKeys } from '~/features/rating/api/query-keys';
import type { MeResponse } from '~/features/auth/types/auth';

interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<MeResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Login failed');
  return data;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data);
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
      queryClient.invalidateQueries({ queryKey: ratingKeys.all });
    },
  });
}
