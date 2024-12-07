import { Metadata } from 'next';
import { getAniByIdQuery } from '~/features/ani/api/get-ani-by-id';
import Ani from '~/features/ani/components/ani';
import { getClient } from '~/lib/client';
import { VariableType } from '~/types/ani';
import { stripTag } from '~/utils/formatter';
import ogImage from '../../../public/og-image.jpg';

interface AniPageProps {
  params: { ani_variable_type: VariableType };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const aniId = searchParams['ani-id'];
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

export default function AniPage({
  params: { ani_variable_type },
}: AniPageProps) {
  return <Ani variableType={ani_variable_type} />;
}
