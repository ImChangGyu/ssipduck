'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Card, CardContent } from '~/components/ui/card';
import { AniItemType } from '~/types/ani';

interface AniItemCompactProps {
  ani: AniItemType;
}

export default function AniItemCompact({ ani }: AniItemCompactProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`${pathname}?ani-id=${ani.id}`, { scroll: false });
  };

  return (
    <Card
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={ani.title.romaji}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      className="group flex-shrink-0 w-[130px] p-0 gap-0 border-transparent bg-transparent shadow-none
        cursor-pointer select-none rounded-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-surface-container border border-outline-variant/50">
        <Image
          src={ani.coverImage.extraLarge}
          fill
          sizes="130px"
          alt={ani.title.romaji}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.18] transition-opacity duration-200 rounded-md" />
      </div>

      <CardContent className="px-0 pt-1.5 pb-0">
        <p className="text-label-sm text-on-surface line-clamp-2 leading-snug">
          {ani.title.romaji}
        </p>
      </CardContent>
    </Card>
  );
}
