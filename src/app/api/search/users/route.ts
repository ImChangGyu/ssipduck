import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '~/lib/supabase/server';

const PAGE_SIZE = 10;

function escapeLike(value: string) {
  return value.replace(/[%_\\]/g, (c) => `\\${c}`);
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q')?.trim() ?? '';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));

  if (!q) {
    return NextResponse.json({ items: [], hasMore: false });
  }

  const supabase = await createClient();
  const offset = (page - 1) * PAGE_SIZE;

  const { data, count, error } = await supabase
    .from('profiles')
    .select('id, nickname, bio', { count: 'exact' })
    .ilike('nickname', `%${escapeLike(q)}%`)
    .order('nickname')
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const total = count ?? 0;
  return NextResponse.json({
    items: data ?? [],
    hasMore: offset + PAGE_SIZE < total,
  });
}
