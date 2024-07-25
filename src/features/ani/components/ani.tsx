'use client';

import { Suspense, useState } from 'react';
import AniListSkeleton from '~/components/ui/skeleton/ani-list-skeleton';
import AniList from '~/features/ani/components/ani-list';
import AniModal from '~/features/ani/components/ani-modal';
import SearchAni from '~/features/ani/components/search-ani';
import { VariableType } from '~/types/ani';

interface AniProps {
  variableType: VariableType;
}

export default function Ani({ variableType }: AniProps) {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <>
      <SearchAni onSubmit={(values) => setSearchKeyword(values.search)} />
      <Suspense fallback={<AniListSkeleton />}>
        <AniList variableType={variableType} searchKeyword={searchKeyword} />
      </Suspense>
      <AniModal />
    </>
  );
}
