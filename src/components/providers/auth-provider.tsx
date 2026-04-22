'use client';

import { useEffect } from 'react';
import { createClient } from '~/lib/supabase/client';
import { useAuthStore } from '~/store/auth';
import { BookmarkRatingHydrator } from '~/components/providers/bookmark-rating-hydrator';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, reset } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    // 토큰 갱신 감지 (세션 만료 자동 갱신)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        reset();
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, reset]);

  return (
    <>
      <BookmarkRatingHydrator />
      {children}
    </>
  );
}
