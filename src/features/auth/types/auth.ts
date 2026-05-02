import type { User } from '@supabase/supabase-js';

export type { User };

export interface Profile {
  id: string;
  nickname: string;
  bio: string | null;
}

export interface MeResponse {
  user: User | null;
  profile: Profile | null;
}
