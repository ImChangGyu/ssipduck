'use client';

import Player from '~/components/ui/player/player';
import FavoriteAni from '~/features/ani/components/favorite-ani';
import * as SVG from '~/assets/svg';
import useGetAniById from '~/features/ani/api/get-ani-by-id';
import Image from 'next/image';
import { stripTag, trailerUrl } from '~/utils/formatter';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AniListWithTitle from '~/features/ani/components/ani-list-with-title';

interface AniModalProps {
  aniId: string;
}

export default function AniModal({ aniId }: AniModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: { Media: ani },
  } = useGetAniById(aniId);

  const onExit = () => {
    router.push(pathname, { scroll: false });
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  return (
    <div className="fixed flex items-center justify-center inset-0">
      <div
        className="w-full h-full fixed top-0 left-0 bg-black opacity-70"
        onClick={onExit}
      />
      <div className="w-[1000px] h-[calc(100vh-100px)] bg-white text-white rounded-lg relative flex flex-col overflow-y-scroll no-scrollbar md:h-full md:rounded-none">
        <div
          className="w-10 h-10 bg-[#00000055] absolute top-4 right-4 rounded-full flex items-center justify-center z-20 cursor-pointer"
          onClick={onExit}
        >
          <SVG.Exit />
        </div>
        <div className="w-full relative">
          <div className="w-full h-[400px]">
            <Player
              url={trailerUrl(ani.trailer?.id ?? '', ani.trailer?.site ?? '')}
              placeholderImage={ani.bannerImage ?? ''}
            />
          </div>
          <div className="w-full h-[50px] absolute bottom-0 left-0 z-20 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="flex flex-col p-8">
          <div className="flex gap-4 justify-between">
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-primary_darken">
                  {ani.title.romaji}
                </h1>
                <FavoriteAni aniId={ani.id} />
              </div>
              <div className="w-full text-[#333]">
                {stripTag(ani.description)}
              </div>
              <div className="flex gap-2 flex-wrap">
                {ani.genres.map((genre, index) => (
                  <span
                    key={`genre_${index}`}
                    className="w-auto text-primary opacity-80 text-sm text-center"
                  >
                    #{genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-[215px] flex-shrink-0 md:hidden">
              <Image
                src={ani.coverImage.extraLarge}
                width={0}
                height={0}
                sizes="100vw"
                alt="애니메이션 메인 포스터 이미지"
                className="w-full"
              />
            </div>
          </div>
          <AniListWithTitle title="Series" aniList={ani.relations.nodes} />
          <AniListWithTitle
            title="Recommendation"
            aniList={ani.recommendations.nodes.map(
              (node) => node.mediaRecommendation
            )}
          />
        </div>
      </div>
    </div>
  );
}
