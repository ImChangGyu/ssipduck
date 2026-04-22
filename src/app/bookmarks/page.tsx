import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { createClient } from '~/lib/supabase/server';
import { getClient } from '~/lib/client';
import { getAniListQuery } from '~/features/ani/api/get-ani-list';
import { bookmarkVariables } from '~/features/ani/constants/ani-variable';
import AniStaticGrid from '~/features/ani/components/ani-static-grid';
import AniListSkeleton from '~/components/ui/skeleton/ani-list-skeleton';
import { AniItemType } from '~/types/ani';

export const metadata = { title: '찜 목록 | 씹덕' };

async function BookmarkList() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('ani_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const ids = bookmarks?.map((b) => b.ani_id) ?? [];

  if (ids.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant gap-2">
        <p className="text-body-lg">찜한 작품이 없습니다.</p>
        <p className="text-body-md">작품 카드의 북마크 버튼을 눌러 찜해보세요.</p>
      </div>
    );
  }

  const [{ data }, { data: statsData }] = await Promise.all([
    getClient().query<{ Page: { media: AniItemType[] } }>({
      query: getAniListQuery,
      variables: bookmarkVariables(ids),
    }),
    supabase.rpc('get_ani_rating_stats', { p_ani_ids: ids }),
  ]);

  const platformStats: Record<number, number> = Object.fromEntries(
    ((statsData ?? []) as { ani_id: number; avg_score: number }[]).map((s) => [s.ani_id, Number(s.avg_score)])
  );

  return <AniStaticGrid items={data.Page.media} platformStats={platformStats} />;
}

export default function BookmarksPage() {
  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 pb-2">
        <h1 className="text-headline-sm font-bold text-on-surface">찜 목록</h1>
      </div>
      <Suspense fallback={<AniListSkeleton />}>
        <BookmarkList />
      </Suspense>
    </div>
  );
}
