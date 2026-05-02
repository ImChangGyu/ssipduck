'use client';

import { useQuery } from '@tanstack/react-query';
import { authKeys } from '~/features/auth/api/query-keys';
import type { MeResponse } from '~/features/auth/types/auth';

export async function getMe(): Promise<MeResponse> {
  const res = await fetch('/api/auth/me');
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export function useMeQuery() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,
    staleTime: 60_000,
    refetchOnMount: false,
  });
}
