'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Card } from '~/components/ui/card';
import { AniItemType } from '~/types/ani';

interface SearchAniItemProps {
  ani: AniItemType;
  onClose: () => void;
}

export default function SearchAniItem({ ani, onClose }: SearchAniItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    router.push(`${pathname}?ani-id=${ani.id}`, { scroll: false });
    onClose();
  }

  return (
    <Card
      onClick={handleClick}
      className="p-0 gap-0 overflow-hidden rounded-lg border-outline-variant/50 bg-surface-container shadow-none cursor-pointer select-none"
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={ani.coverImage.extraLarge}
          fill
          sizes="(max-width: 640px) 33vw, 120px"
          alt={ani.title.romaji}
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2">
          <p className="text-label-sm font-medium text-white leading-snug line-clamp-2">
            {ani.title.romaji}
          </p>
        </div>
      </div>
    </Card>
  );
}
