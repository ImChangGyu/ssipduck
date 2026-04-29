'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { VariableType } from '~/types/ani';

const VALID_TYPES: VariableType[] = ['popular', 'trend', 'upcoming', 'movie'];
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

  const buildUrl = useCallback(
    (nextType: VariableType) => {
      const params = new URLSearchParams();
      params.set('type', nextType);
      const aniId = searchParams.get('ani-id');
      if (aniId) params.set('ani-id', aniId);
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const setType = useCallback(
    (nextType: VariableType) => {
      router.replace(buildUrl(nextType));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router, buildUrl]
  );

  return { type, setType };
}
