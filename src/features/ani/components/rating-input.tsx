'use client';

import { useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useAuthStore } from '~/store/auth';
import { useRatingStore } from '~/store/rating';

interface RatingInputProps {
  aniId: number;
}

export default function RatingInput({ aniId }: RatingInputProps) {
  const user = useAuthStore((s) => s.user);
  const { get, set: setScore, clear } = useRatingStore();
  const currentScore = get(aniId); // 1~10
  const [hoverScore, setHoverScore] = useState<number | null>(null);

  const displayScore = hoverScore ?? currentScore ?? 0; // 1~10

  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getHalfScore(e: React.MouseEvent<HTMLButtonElement>, starIndex: number): number {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    return isLeftHalf ? starIndex * 2 - 1 : starIndex * 2;
  }

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>, starIndex: number) {
    if (!user) return;
    const score = getHalfScore(e, starIndex);

    if (score === currentScore) {
      // 같은 점수 재클릭 → 해제
      clear(aniId);
      const res = await fetch(`/api/ratings?aniId=${aniId}`, { method: 'DELETE' });
      if (!res.ok) setScore(aniId, score); // 실패 시 롤백
    } else {
      setScore(aniId, score);
      const res = await fetch('/api/ratings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aniId, score }),
      });
      if (!res.ok) {
        if (currentScore !== undefined) setScore(aniId, currentScore);
        else clear(aniId);
      }
    }
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label-sm text-on-surface-variant">내 평점</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          const starIndex = i + 1; // 1~5
          const fullScore = starIndex * 2; // 2~10
          const halfScore = fullScore - 1; // 1~9

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
              {/* 빈 별 */}
              <Star className="size-6 fill-current opacity-30" />
              {/* 채워진 부분 */}
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
