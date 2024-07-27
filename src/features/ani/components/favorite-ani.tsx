import { MouseEventHandler } from 'react';
import { useFavoriteAniListStore } from '~/store/ani';
import * as SVG from '~/assets/svg';
import { cn } from '~/utils/cn';

interface FavoriteAniProps {
  aniId: number;
}

export default function FavoriteAni({ aniId }: FavoriteAniProps) {
  const { favoriteAniIdList, updateFavoriteAniIdList } =
    useFavoriteAniListStore();

  const onFavoriteAniClick: MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    updateFavoriteAniIdList(aniId);
  };

  return (
    <SVG.Star
      className={cn(
        'flex-shrink',
        favoriteAniIdList.includes(aniId)
          ? 'fill-primary storke-primary'
          : 'fill-white stroke-gray_scale_100'
      )}
      onClick={onFavoriteAniClick}
    />
  );
}
