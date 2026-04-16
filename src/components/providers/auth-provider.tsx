'use client';

import { useEffect } from 'react';
import { createClient } from '~/lib/supabase/client';
import { useAuthStore } from '~/store/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setProfile, setLoading, reset } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    // 초기 세션 로드
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        supabase
          .from('profiles')
          .select('id, nickname')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            if (data) setProfile(data);
          });
      }
      setLoading(false);
    });

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('profiles')
          .select('id, nickname')
          .eq('id', session.user.id)
          .single();
        if (data) setProfile(data);
      } else {
        reset();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setProfile, setLoading, reset]);

  return <>{children}</>;
}
