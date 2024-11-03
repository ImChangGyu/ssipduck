'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AniListSkeleton from '~/components/ui/skeleton/ani-list-skeleton';
const AniModalSkeleton = dynamic(
  () => import('~/components/ui/skeleton/ani-modal-skeleton')
);
const AniList = dynamic(() => import('~/features/ani/components/ani-list'), {
  loading: () => <AniListSkeleton />,
});
const AniModal = dynamic(() => import('~/features/ani/components/ani-modal'), {
  loading: () => <AniModalSkeleton />,
});
import SearchAni from '~/features/ani/components/search-ani';
import { VariableType } from '~/types/ani';

interface AniProps {
  variableType: VariableType;
}

export default function Ani({ variableType }: AniProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchparams = useSearchParams();
  const aniId = searchparams.get('ani-id');

  return (
    <>
      <SearchAni onSubmit={(values) => setSearchKeyword(values.search)} />
      <Suspense fallback={<AniListSkeleton />}>
        <AniList variableType={variableType} searchKeyword={searchKeyword} />
      </Suspense>
      {aniId && <AniModal aniId={aniId} />}
    </>
  );
}
