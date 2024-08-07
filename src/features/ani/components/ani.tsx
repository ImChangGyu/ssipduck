'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AniListSkeleton from '~/components/ui/skeleton/ani-list-skeleton';
import AniModalSkeleton from '~/components/ui/skeleton/ani-modal-skeleton';
import AniList from '~/features/ani/components/ani-list';
import AniModal from '~/features/ani/components/ani-modal';
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
      {aniId && (
        <Suspense fallback={<AniModalSkeleton />}>
          <AniModal aniId={aniId} />
        </Suspense>
      )}
    </>
  );
}
