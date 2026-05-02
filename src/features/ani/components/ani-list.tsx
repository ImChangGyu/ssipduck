'use client';

import { startTransition } from 'react';
import { getAniListByPage, useAniList } from '~/features/ani/api/get-ani-list';
import { VariableType } from '~/types/ani';
import useInfiniteScroll from '~/hooks/useInfiniteScroll';
import { ANI_VARIABLES } from '~/features/ani/constants/ani-variable';
import AniItem from '~/features/ani/components/ani-item';
import { useRatingsStatsQuery } from '~/features/rating/api/get-ratings-stats';

interface AniListProps {
  variableType: VariableType;
}

export default function AniList({ variableType }: AniListProps) {
  const {
    data: {
      Page: { media: aniList },
    },
    fetchMore,
  } = useAniList({ variableType });

  const { ref } = useInfiniteScroll((page) => {
    startTransition(() => {
      fetchMore({
        variables: ANI_VARIABLES(page)[variableType](),
        updateQuery: getAniListByPage,
      });
    });
  });

  const aniIds = aniList.map((a) => a.id);
  const { data: statsMap } = useRatingsStatsQuery(aniIds);

  return (
    <div className="w-full grid gap-4 grid-cols-list px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
      {aniList.map((ani, index) => (
        <AniItem
          ani={ani}
          key={`ani-item_${ani.id}_${index}`}
          platformAvgScore={statsMap.get(ani.id)?.avgScore}
          platformRatingCount={statsMap.get(ani.id)?.ratingCount}
        />
      ))}
      <div ref={ref} className="col-span-full" />
    </div>
  );
}
