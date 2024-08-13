'use client';

import Image from 'next/image';
import { AniItemType } from '~/types/ani';
import { stripTag } from '~/utils/formatter';
import FavoriteAni from '~/features/ani/components/favorite-ani';
import { usePathname, useRouter } from 'next/navigation';
import { LoggerButton } from '~/components/ui/button/index';

interface AniItemProps {
  ani: AniItemType;
}

export default function AniItem({ ani }: AniItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onAniItemClick = () => {
    router.push(`${pathname}?ani-id=${ani.id}`, {
      scroll: false,
    });
  };

  return (
    <LoggerButton event="click" value={ani.id}>
      <div
        onClick={onAniItemClick}
        className="w-full h-[360px] flex flex-col gap-4 p-6 bg-white border border-transparent rounded-2xl shadow-item cursor-pointer hover:border-primary hover:shadow-hover_shadow_color"
      >
        <Image
          src={ani.coverImage.extraLarge}
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="w-full min-h-[170px] object-cover rounded-lg"
          alt="anime-main-image"
        />
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col gap-[10px]">
            <div className="w-full flex justify-between items-center">
              <div className="w-[90%] text-primary_darken font-bold line-clamp-1">
                {ani.title.romaji}
              </div>
              <FavoriteAni aniId={ani.id} />
            </div>
            <div className="text-gray_description text-sm mb-4 line-clamp-3">
              {stripTag(ani.description)}
            </div>
          </div>
          <div className="w-full flex gap-2 truncate">
            {ani.genres.map((genre, index) => (
              <span
                key={`genre_${index}`}
                className="w-auto text-primary opacity-80 text-xs text-center"
              >
                #{genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </LoggerButton>
  );
}
