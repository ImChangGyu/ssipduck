import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '~/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const aniId = Number(request.nextUrl.searchParams.get('aniId'));

  if (!aniId || isNaN(aniId)) {
    return NextResponse.json({ error: 'aniId가 필요합니다.' }, { status: 400 });
  }

  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('ani_id', aniId)
    .order('updated_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!comments || comments.length === 0) {
    return NextResponse.json({ comments: [] });
  }

  const userIds = [...new Set(comments.map((c) => c.user_id))];

  const [profilesRes, ratingsRes] = await Promise.all([
    supabase.from('profiles').select('id, nickname').in('id', userIds),
    supabase.from('ratings').select('user_id, score').eq('ani_id', aniId).in('user_id', userIds),
  ]);

  const profileMap = new Map(
    (profilesRes.data ?? []).map((p) => [p.id, { nickname: p.nickname }])
  );
  const ratingMap = new Map(
    (ratingsRes.data ?? []).map((r) => [r.user_id, r.score])
  );

  return NextResponse.json({
    comments: comments.map((c) => ({
      userId: c.user_id,
      aniId: c.ani_id,
      content: c.content,
      score: ratingMap.get(c.user_id) ?? 0,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
      profile: profileMap.get(c.user_id) ?? null,
    })),
  });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const body = await request.json();
  const aniId = Number(body.aniId);
  const content = String(body.content ?? '').trim();

  if (!aniId || isNaN(aniId)) {
    return NextResponse.json({ error: 'aniId가 필요합니다.' }, { status: 400 });
  }
  if (!content || content.length < 1 || content.length > 500) {
    return NextResponse.json({ error: '댓글은 1~500자 사이여야 합니다.' }, { status: 400 });
  }

  const { data: rating } = await supabase
    .from('ratings')
    .select('score')
    .eq('user_id', user.id)
    .eq('ani_id', aniId)
    .maybeSingle();

  if (!rating) {
    return NextResponse.json({ error: '별점을 먼저 남겨주세요.' }, { status: 422 });
  }

  const { error } = await supabase
    .from('comments')
    .upsert(
      { user_id: user.id, ani_id: aniId, content },
      { onConflict: 'user_id,ani_id' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const aniId = Number(request.nextUrl.searchParams.get('aniId'));

  if (!aniId || isNaN(aniId)) {
    return NextResponse.json({ error: 'aniId가 필요합니다.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('user_id', user.id)
    .eq('ani_id', aniId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
