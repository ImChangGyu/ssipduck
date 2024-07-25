'use client';

import { getAniListByPage, useAniList } from '~/features/ani/api/get-ani-list';
import { VariableType } from '~/types/ani';
import useInfiniteScroll from '~/hooks/useInfiniteScroll';
import { ANI_VARIABLES } from '~/features/ani/constants/ani-variable';
import { startTransition } from 'react';
import AniItem from '~/features/ani/components/ani-item';

interface AniListProps {
  variableType: VariableType;
  searchKeyword?: string;
}

export default function AniList({ variableType, searchKeyword }: AniListProps) {
  const {
    data: {
      Page: { media: aniList },
    },
    fetchMore,
  } = useAniList({ variableType, searchKeyword });

  const { ref } = useInfiniteScroll((page) => {
    if (variableType === 'favorite') return;
    startTransition(() => {
      fetchMore({
        variables: ANI_VARIABLES(page, searchKeyword)[variableType](),
        updateQuery: getAniListByPage,
      });
    });
  });

  return (
    <div className="w-full h-full grid gap-[24px] grid-cols-list mb-[5px] px-[3%] py-[20px] md:px-[5%] justify-items-center">
      {aniList.map((ani, index) => (
        <AniItem ani={ani} key={`ani-item_${ani.id}_${index}`} />
      ))}
      <div ref={ref} />
    </div>
  );
}
