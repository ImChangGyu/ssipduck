'use client';

import AniItem from '~/features/ani/components/ani-item';
import RatingStars from '~/components/ui/rating-stars';
import { AniItemType } from '~/types/ani';

interface AniStaticGridProps {
  items: AniItemType[];
  /** 유저 본인 점수 (ratings 페이지용) aniId → score 1~10 */
  scores?: Record<number, number>;
  /** 플랫폼 평균 점수 aniId → avgScore 1~10 */
  platformStats?: Record<number, number>;
}

export default function AniStaticGrid({ items, scores, platformStats }: AniStaticGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant gap-2">
        <p className="text-body-lg">아직 항목이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full grid gap-4 grid-cols-list px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
      {items.map((ani, index) => (
        <div key={`ani-static_${ani.id}_${index}`} className="flex flex-col gap-3">
          <AniItem ani={ani} platformAvgScore={platformStats?.[ani.id]} />
          {scores?.[ani.id] !== undefined && (
            <div className="flex items-center gap-1 px-1">
              <RatingStars score={scores[ani.id] / 2} size="sm" />
              <span className="text-label-sm text-on-surface-variant">
                {(scores[ani.id] / 2).toFixed(1)}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
