import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '~/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('ratings')
    .select('ani_id, score')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ratings: data.map((row) => ({ aniId: row.ani_id, score: row.score })),
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
  const score = Number(body.score);

  if (!aniId || isNaN(aniId)) {
    return NextResponse.json({ error: 'aniId가 필요합니다.' }, { status: 400 });
  }
  if (!score || isNaN(score) || score < 1 || score > 10) {
    return NextResponse.json({ error: 'score는 1~10 사이 정수여야 합니다.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('ratings')
    .upsert(
      { user_id: user.id, ani_id: aniId, score },
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
    .from('ratings')
    .delete()
    .eq('user_id', user.id)
    .eq('ani_id', aniId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
