'use client';

import Player from '~/components/ui/player/player';
import FavoriteAni from '~/features/ani/components/favorite-ani';
import * as SVG from '~/assets/svg';
import AniItem from '~/features/ani/components/ani-item';
import useGetAniById from '~/features/ani/api/get-ani-by-id';
import Image from 'next/image';
import { stripTag, trailerUrl } from '~/utils/formatter';
import { usePathname, useRouter } from 'next/navigation';

interface AniModalProps {
  aniId: string;
}

export default function AniModal({ aniId }: AniModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: { Media: ani },
  } = useGetAniById(aniId);

  console.log(ani);

  const onExit = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="fixed flex items-center justify-center inset-0">
      <div className="w-full h-full fixed top-0 left-0 bg-black opacity-70" />
      <div className="w-[1000px] h-[calc(100vh-100px)] bg-white text-white rounded-lg relative flex flex-col overflow-scroll">
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
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-primary_darken">
                  {ani.title.romaji}
                </h1>
                <FavoriteAni aniId={160044} />
              </div>
              <div className="w-full text-[#333]">
                {stripTag(ani.description)}
              </div>
              <div className="flex gap-2">
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
            <div className="w-[215px] flex-shrink-0">
              <Image
                src={ani.coverImage.extraLarge}
                width={0}
                height={0}
                sizes="100vw"
                alt="hello"
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-black text-xl font-bold">Recommendation</h2>
            <div className="w-full h-full grid gap-[24px] grid-cols-modal_list justify-items-center mb-[5px] py-[20px] ">
              {ani.recommendations.nodes.map((node) => (
                <AniItem
                  key={`ani-recommendation-${node.mediaRecommendation.id}`}
                  ani={node.mediaRecommendation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
