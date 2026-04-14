'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { VariableType } from '~/types/ani';

const VALID_TYPES: VariableType[] = ['popular', 'trend', 'upcoming', 'movie', 'favorite'];
const DEFAULT_TYPE: VariableType = 'popular';

function isValidType(value: string | null): value is VariableType {
  return VALID_TYPES.includes(value as VariableType);
}

export function useAniFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawType = searchParams.get('type');
  const type: VariableType = isValidType(rawType) ? rawType : DEFAULT_TYPE;
  const q = searchParams.get('q') ?? '';

  const buildUrl = useCallback(
    (nextType: VariableType, nextQ: string) => {
      const params = new URLSearchParams();
      params.set('type', nextType);
      if (nextQ) params.set('q', nextQ);
      // Preserve ani-id if present
      const aniId = searchParams.get('ani-id');
      if (aniId) params.set('ani-id', aniId);
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const setType = useCallback(
    (nextType: VariableType) => {
      // When switching type, clear search query and reset scroll
      router.replace(buildUrl(nextType, ''));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router, buildUrl]
  );

  const setQ = useCallback(
    (nextQ: string) => {
      router.replace(buildUrl(type, nextQ));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router, buildUrl, type]
  );

  return { type, q, setType, setQ };
}
