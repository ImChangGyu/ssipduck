'use client';

import { startTransition, useEffect, useRef, useState } from 'react';
import { getAniListByPage, useAniList } from '~/features/ani/api/get-ani-list';
import { VariableType } from '~/types/ani';
import useInfiniteScroll from '~/hooks/useInfiniteScroll';
import { ANI_VARIABLES } from '~/features/ani/constants/ani-variable';
import AniItem from '~/features/ani/components/ani-item';

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

  // 플랫폼 평균 평점 (aniId → avgScore 1~10)
  const [statsMap, setStatsMap] = useState<Map<number, number>>(new Map());
  const fetchedIdsRef = useRef<string>('');

  useEffect(() => {
    if (aniList.length === 0) return;
    const idsKey = aniList.map((a) => a.id).join(',');
    if (idsKey === fetchedIdsRef.current) return;
    fetchedIdsRef.current = idsKey;

    fetch(`/api/ratings/stats?aniIds=${idsKey}`)
      .then((r) => r.json())
      .then((d) => {
        setStatsMap((prev) => {
          const next = new Map(prev);
          for (const s of d.stats ?? []) next.set(s.aniId, s.avgScore);
          return next;
        });
      })
      .catch(() => {});
  }, [aniList]);

  return (
    <div className="w-full grid gap-4 grid-cols-list px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
      {aniList.map((ani, index) => (
        <AniItem
          ani={ani}
          key={`ani-item_${ani.id}_${index}`}
          platformAvgScore={statsMap.get(ani.id)}
        />
      ))}
      <div ref={ref} className="col-span-full" />
    </div>
  );
}
