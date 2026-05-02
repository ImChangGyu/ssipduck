'use client';

import { useMutation } from '@tanstack/react-query';

interface SignupPayload {
  email: string;
  password: string;
  nickname: string;
  redirectTo?: string;
}

export async function signup(payload: SignupPayload): Promise<{ success: true }> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Signup failed');
  return data;
}

export function useSignupMutation() {
  return useMutation({ mutationFn: signup });
}
