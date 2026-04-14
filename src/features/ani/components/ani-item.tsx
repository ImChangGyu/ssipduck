'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '~/components/ui/badge';
import { Card } from '~/components/ui/card';
import FavoriteAni from '~/features/ani/components/favorite-ani';
import useLogger from '~/hooks/useLogger';
import { AniItemType } from '~/types/ani';

interface AniItemProps {
  ani: AniItemType;
}

export default function AniItem({ ani }: AniItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const logger = useLogger();

  const handleClick = () => {
    logger.click({ event: 'click_ani_item', value: ani.id });
    router.push(`${pathname}?ani-id=${ani.id}`, { scroll: false });
  };

  return (
    <Card
      onClick={handleClick}
      className="group relative p-0 gap-0 overflow-hidden rounded-lg border-outline-variant/50 bg-surface-container shadow-none cursor-pointer select-none
        transition-[transform,box-shadow] duration-300 ease-out
        hover:scale-105 hover:shadow-elevation-3 hover:z-10"
    >
      <div className="relative aspect-[2/3] w-full">
        {/* Poster */}
        <Image
          src={ani.coverImage.extraLarge}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 28vw, 250px"
          alt={ani.title.romaji}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay — fades in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Info overlay — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-2
          translate-y-3 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 delay-[40ms]">

          <h3 className="text-label-lg font-bold text-white leading-snug line-clamp-2">
            {ani.title.romaji}
          </h3>

          {ani.genres.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {ani.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="h-5 px-2 py-0 text-xs"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          )}

          <div onClick={(e) => e.stopPropagation()} className="-ml-2">
            <FavoriteAni aniId={ani.id} />
          </div>
        </div>
      </div>
    </Card>
  );
}
