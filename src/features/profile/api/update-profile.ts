'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '~/features/auth/api/query-keys';
import type { MeResponse, Profile } from '~/features/auth/types/auth';

interface UpdateProfilePayload {
  nickname?: string;
  bio?: string | null;
}

interface UpdateProfileResponse {
  profile: Profile;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UpdateProfileResponse> {
  const res = await fetch('/api/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Failed to update profile');
  return data;
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData<MeResponse>(authKeys.me(), (old) => {
        if (!old) return old;
        return { ...old, profile: data.profile };
      });
    },
  });
}
