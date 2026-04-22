'use client';

import { Star } from 'lucide-react';
import { cn } from '~/lib/utils';

interface RatingStarsProps {
  /** 0~5 범위, 0.5 단위 */
  score: number;
  size?: 'sm' | 'md';
  className?: string;
}

export default function RatingStars({ score, size = 'sm', className }: RatingStarsProps) {
  const sizeClass = size === 'sm' ? 'size-3' : 'size-4';

  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`평점 ${score}점`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = score - i;
        const isHalf = filled > 0 && filled < 1;
        const isFull = filled >= 1;

        return (
          <span key={i} className="relative inline-flex">
            {/* 빈 별 (배경) */}
            <Star className={cn(sizeClass, 'fill-current opacity-30')} />
            {/* 채워진 부분 (full or half) */}
            {(isFull || isHalf) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: isFull ? '100%' : '50%' }}
              >
                <Star className={cn(sizeClass, 'fill-amber-400 text-amber-400')} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
