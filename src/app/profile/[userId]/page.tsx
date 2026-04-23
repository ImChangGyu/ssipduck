import { notFound } from 'next/navigation';
import { createClient } from '~/lib/supabase/server';
import { getClient } from '~/lib/client';
import { getAniListQuery } from '~/features/ani/api/get-ani-list';
import { bookmarkVariables } from '~/features/ani/constants/ani-variable';
import { AniItemType } from '~/types/ani';
import ProfileHeader from '~/features/profile/components/profile-header';
import ProfileStats from '~/features/profile/components/profile-stats';
import ProfileActivityGrid from '~/features/profile/components/profile-activity-grid';

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { userId } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', userId)
    .maybeSingle();

  return { title: profile ? `${profile.nickname}의 프로필 | 씹덕` : '프로필 | 씹덕' };
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  const supabase = await createClient();

  const [
    { data: profile },
    { data: { user: currentUser } },
    { data: ratings },
    { data: bookmarks },
  ] = await Promise.all([
    supabase.from('profiles').select('id, nickname, bio').eq('id', userId).maybeSingle(),
    supabase.auth.getUser(),
    supabase.from('ratings').select('ani_id, score').eq('user_id', userId).order('updated_at', { ascending: false }),
    supabase.from('bookmarks').select('ani_id').eq('user_id', userId).order('created_at', { ascending: false }),
  ]);

  if (!profile) notFound();

  const isOwner = currentUser?.id === userId;

  const ratingIds = (ratings ?? []).map((r) => r.ani_id);
  const bookmarkIds = (bookmarks ?? []).map((b) => b.ani_id);
  const recentRatingIds = ratingIds.slice(0, 6);
  const recentBookmarkIds = bookmarkIds.slice(0, 6);

  const allPreviewIds = [...new Set([...recentRatingIds, ...recentBookmarkIds])];

  const [ratingAniData, bookmarkAniData, statsData] = await Promise.all([
    recentRatingIds.length > 0
      ? getClient().query<{ Page: { media: AniItemType[] } }>({
          query: getAniListQuery,
          variables: bookmarkVariables(recentRatingIds),
        })
      : null,
    recentBookmarkIds.length > 0
      ? getClient().query<{ Page: { media: AniItemType[] } }>({
          query: getAniListQuery,
          variables: bookmarkVariables(recentBookmarkIds),
        })
      : null,
    allPreviewIds.length > 0
      ? supabase.rpc('get_ani_rating_stats', { p_ani_ids: allPreviewIds })
      : null,
  ]);

  const platformStats: Record<number, number> = Object.fromEntries(
    ((statsData?.data ?? []) as { ani_id: number; avg_score: number }[]).map((s) => [
      s.ani_id,
      Number(s.avg_score),
    ])
  );

  const scoreMap: Record<number, number> = Object.fromEntries(
    (ratings ?? []).map((r) => [r.ani_id, r.score])
  );

  const ratingItems = ratingAniData?.data?.Page?.media ?? [];
  const bookmarkItems = bookmarkAniData?.data?.Page?.media ?? [];

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pt-10 pb-6">
        <ProfileHeader profile={profile} isOwner={isOwner} />
        <div className="mt-6">
          <ProfileStats ratingCount={ratingIds.length} bookmarkCount={bookmarkIds.length} />
        </div>
      </div>

      <div className="mt-4 border-t border-outline-variant" />

      <ProfileActivityGrid
        title="평가한 애니"
        items={ratingItems}
        scores={scoreMap}
        platformStats={platformStats}
        moreHref={`/profile/${userId}/ratings`}
        emptyMessage="아직 평가한 애니가 없습니다."
      />

      <div className="border-t border-outline-variant" />

      <ProfileActivityGrid
        title="북마크한 애니"
        items={bookmarkItems}
        platformStats={platformStats}
        moreHref={`/profile/${userId}/bookmarks`}
        emptyMessage="아직 북마크한 애니가 없습니다."
      />
    </div>
  );
}
