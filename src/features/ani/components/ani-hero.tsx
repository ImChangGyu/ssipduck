'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import Player from '~/components/ui/player/player';
import { useAniHero } from '~/features/ani/api/get-ani-hero';
import { VariableType } from '~/types/ani';
import { stripTag, trailerUrl } from '~/utils/formatter';

interface AniHeroProps {
  type: VariableType;
}

const TYPE_LABEL: Record<VariableType, string> = {
  popular:  '인기',
  trend:    '트렌딩',
  upcoming: '개봉 예정',
  movie:    '극장판',
  favorite: '즐겨찾기',
};

export default function AniHero({ type }: AniHeroProps) {
  const {
    data: {
      Page: { media },
    },
  } = useAniHero(type);

  const ani = media[0];
  const router = useRouter();
  const pathname = usePathname();

  if (!ani) return null;

  const bgImage = ani.bannerImage || ani.coverImage.extraLarge;
  const hasTrailer = Boolean(ani.trailer?.id);
  const description = stripTag(ani.description);

  const onHeroClick = () => {
    router.push(`${pathname}?ani-id=${ani.id}`, { scroll: false });
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'min(65vh, 560px)' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        {hasTrailer ? (
          <Player
            url={trailerUrl(ani.trailer!.id!, ani.trailer!.site ?? '')}
            placeholderImage={bgImage}
          />
        ) : (
          <Image
            src={bgImage}
            fill
            sizes="100vw"
            priority
            alt=""
            aria-hidden
            className="object-cover object-center scale-[1.04]"
          />
        )}
        {/* Subtle image outline */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(237,237,242,0.06)' }}
        />
        {/* Bottom gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/55 to-background/10" />
        {/* Left gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/85 via-background/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-30 flex items-end">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 flex flex-col gap-4 max-w-2xl animate-hero-content">
          {/* Category label */}
          <span className="inline-flex items-center gap-2 text-label-md font-semibold text-primary tracking-widest uppercase">
            <span aria-hidden className="w-5 h-[2px] rounded-full bg-primary inline-block" />
            {TYPE_LABEL[type]}
          </span>

          {/* Title */}
          <h1 className="text-headline-lg md:text-display-sm font-bold text-on-surface leading-tight text-balance">
            {ani.title.romaji}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-body-md text-on-surface/75 line-clamp-2 hidden sm:block text-pretty">
              {description}
            </p>
          )}

          {/* Genre badges */}
          {ani.genres.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {ani.genres.slice(0, 4).map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="backdrop-blur-sm border-outline-variant/60 text-on-surface-variant bg-surface-container-highest/70 rounded-full"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          )}

          {/* CTA */}
          <Button
            onClick={onHeroClick}
            size="lg"
            className="self-start rounded-full mt-1"
            aria-label={`${ani.title.romaji} 상세 보기`}
          >
            <Play data-icon="inline-start" />
            상세 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
