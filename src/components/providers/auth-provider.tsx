'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '~/lib/supabase/client';
import { authKeys } from '~/features/auth/api/query-keys';
import { bookmarkKeys } from '~/features/bookmark/api/query-keys';
import { ratingKeys } from '~/features/rating/api/query-keys';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(authKeys.me(), { user: null, profile: null });
        queryClient.removeQueries({ queryKey: bookmarkKeys.all });
        queryClient.removeQueries({ queryKey: ratingKeys.all });
      } else if (event === 'TOKEN_REFRESHED') {
        queryClient.invalidateQueries({ queryKey: authKeys.me() });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return <>{children}</>;
}
