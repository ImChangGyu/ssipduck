import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '~/lib/supabase/server';

const patchSchema = z.object({
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.').max(20, '닉네임은 20자 이하여야 합니다.').optional(),
  bio: z.string().max(120, '한줄소개는 120자 이하여야 합니다.').nullable().optional(),
});

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const body = await request.json();
  const result = patchSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  const { nickname, bio } = result.data;
  const updates: { nickname?: string; bio?: string | null } = {};
  if (nickname !== undefined) updates.nickname = nickname;
  if (bio !== undefined) updates.bio = bio;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: '변경할 내용이 없습니다.' }, { status: 400 });
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select('id, nickname, bio')
    .single();

  if (error) {
    return NextResponse.json({ error: '프로필 수정에 실패했습니다.' }, { status: 500 });
  }

  return NextResponse.json({ profile });
}
