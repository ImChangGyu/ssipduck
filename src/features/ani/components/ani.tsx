import { Suspense } from 'react';
import AniListSkeleton from '~/components/ui/skeleton/ani-list-skeleton';
import AniList from '~/features/ani/components/ani-list';
import SearchAni from '~/features/ani/components/search-ani';
import { VariableType } from '~/types/ani';

interface AniProps {
  variableType: VariableType;
}

export default function Ani({ variableType }: AniProps) {
  return (
    <>
      <SearchAni />
      <Suspense fallback={<AniListSkeleton />}>
        <AniList variableType={variableType} />
      </Suspense>
    </>
  );
}
