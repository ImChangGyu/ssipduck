import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAniByIdQuery } from '~/features/ani/api/get-ani-by-id';
import Ani from '~/features/ani/components/ani';
import AniListSkeleton from '~/components/ui/skeleton/ani-list-skeleton';
import { getClient } from '~/lib/client';
import { stripTag } from '~/utils/formatter';
import ogImage from '../../public/og-image.jpg';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const aniId = resolvedSearchParams['ani-id'];
  if (!aniId) return { title: '씹덕' };

  const aniInfo = await getClient().query({
    query: getAniByIdQuery,
    variables: { id: aniId },
  });

  return {
    title: `${aniInfo.data.Media.title.romaji} | 씹덕`,
    openGraph: {
      title: `${aniInfo.data.Media.title.romaji} | 씹덕`,
      description: stripTag(aniInfo.data.Media.description),
      images: [aniInfo.data.Media.bannerImage, ogImage.src],
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<AniListSkeleton />}>
      <Ani />
    </Suspense>
  );
}
