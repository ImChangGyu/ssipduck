'use client';

import { useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useMeQuery } from '~/features/auth/api/get-me';
import { useMyRating } from '~/features/rating/api/get-ratings';
import { useUpsertRatingMutation } from '~/features/rating/api/upsert-rating';
import { useDeleteRatingMutation } from '~/features/rating/api/delete-rating';

interface RatingInputProps {
  aniId: number;
}

export default function RatingInput({ aniId }: RatingInputProps) {
  const { data } = useMeQuery();
  const user = data?.user ?? null;
  const currentScore = useMyRating(aniId, !!user);
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const upsertMutation = useUpsertRatingMutation();
  const deleteMutation = useDeleteRatingMutation();

  const displayScore = hoverScore ?? currentScore ?? 0;

  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getHalfScore(e: React.MouseEvent<HTMLButtonElement>, starIndex: number): number {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    return isLeftHalf ? starIndex * 2 - 1 : starIndex * 2;
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, starIndex: number) {
    if (!user) return;
    const score = getHalfScore(e, starIndex);

    if (score === currentScore) {
      deleteMutation.mutate(aniId);
    } else {
      upsertMutation.mutate({ aniId, score });
    }
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label-sm text-on-surface-variant">내 평점</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          const starIndex = i + 1;
          const fullScore = starIndex * 2;
          const halfScore = fullScore - 1;

          const isFull = displayScore >= fullScore;
          const isHalf = !isFull && displayScore >= halfScore;

          return (
            <button
              key={i}
              ref={(el) => { starRefs.current[i] = el; }}
              type="button"
              aria-label={`${starIndex}점`}
              className="relative size-7 flex items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onMouseMove={(e) => setHoverScore(getHalfScore(e, starIndex))}
              onMouseLeave={() => setHoverScore(null)}
              onClick={(e) => handleClick(e, starIndex)}
            >
              <Star className="size-6 fill-current opacity-30" />
              {(isFull || isHalf) && (
                <span
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  style={{ clipPath: isFull ? 'none' : 'inset(0 50% 0 0)' }}
                >
                  <Star
                    className={cn(
                      'size-6 fill-amber-400 text-amber-400 transition-transform duration-100',
                      hoverScore !== null && 'scale-110'
                    )}
                  />
                </span>
              )}
            </button>
          );
        })}
        {currentScore !== undefined && (
          <span className="text-label-sm text-on-surface-variant ml-1">
            {(currentScore / 2).toFixed(1)}★
          </span>
        )}
      </div>
    </div>
  );
}
