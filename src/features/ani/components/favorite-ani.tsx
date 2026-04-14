'use client';

import { Star } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useFavoriteAniListStore } from '~/store/ani';

interface FavoriteAniProps {
  aniId: number;
}

export default function FavoriteAni({ aniId }: FavoriteAniProps) {
  const { favoriteAniIdList, updateFavoriteAniIdList } = useFavoriteAniListStore();
  const isFavorite = favoriteAniIdList.includes(aniId);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        updateFavoriteAniIdList(aniId);
      }}
      aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      aria-pressed={isFavorite}
      className="rounded-full"
    >
      <Star
        className={cn(
          'transition-colors duration-150',
          isFavorite
            ? 'fill-primary text-primary'
            : 'text-muted-foreground'
        )}
      />
    </Button>
  );
}
