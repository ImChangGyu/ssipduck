import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '~/lib/supabase/server';

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('aniIds') ?? '';
  const aniIds = raw
    .split(',')
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);

  if (aniIds.length === 0) {
    return NextResponse.json({ stats: [] });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_ani_rating_stats', {
    p_ani_ids: aniIds,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // avg_score: 1~10 스케일 → 클라이언트에서 /2 해서 별 5개로 환산
  return NextResponse.json({
    stats: (data ?? []).map((row: { ani_id: number; avg_score: number; rating_count: number }) => ({
      aniId: row.ani_id,
      avgScore: Number(row.avg_score),   // 1~10
      ratingCount: Number(row.rating_count),
    })),
  });
}
