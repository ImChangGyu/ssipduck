import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '~/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .select('ani_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ aniIds: data.map((row) => row.ani_id) });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const body = await request.json();
  const aniId = Number(body.aniId);

  if (!aniId || isNaN(aniId)) {
    return NextResponse.json({ error: 'aniId가 필요합니다.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('bookmarks')
    .upsert({ user_id: user.id, ani_id: aniId }, { onConflict: 'user_id,ani_id' });

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
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('ani_id', aniId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
