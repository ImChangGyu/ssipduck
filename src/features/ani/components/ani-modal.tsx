'use client';

import Player from '~/components/ui/player/player';
import FavoriteAni from '~/features/ani/components/favorite-ani';
import * as SVG from '~/assets/svg';

export default function AniModal() {
  return (
    <div className="fixed flex items-center justify-center inset-0">
      <div className="w-full h-full fixed top-0 left-0 bg-black opacity-70" />
      <div className="w-[1000px] h-[calc(100vh-100px)] bg-white text-white rounded-lg relative flex flex-col overflow-hidden">
        <div className="w-10 h-10 bg-[#00000055] absolute top-4 right-4 rounded-full flex items-center justify-center z-10 cursor-pointer">
          <SVG.Exit />
        </div>
        <div className="w-full relative">
          <div className="w-full h-[400px]">
            <Player url="https://www.youtube.com/embed/O6qVieflwqs" />
          </div>
          <div className="w-full h-[50px] absolute bottom-0 left-0 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="flex p-8 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary_darken">
                Jujutsu Kaisen 2nd Season
              </span>
              <FavoriteAni aniId={160044} />
            </div>
            <div className="w-full text-[#333]">
              The second season of Jujutsu Kaisen. The past comes to light when
              second-year students Satoru Gojou and Suguru Getou are tasked with
              escorting young Riko Amanai to Master Tengen. But when a
              non-sorcerer user tries to kill them, their mission to protect the
              Star Plasma Vessel threatens to turn them into bitter enemies and
              cement their destinies—one as the world’s strongest sorcerer, and
              the other its most twisted curse user!
            </div>
            <div className="flex gap-2">
              <span className="w-auto text-primary opacity-80 text-sm text-center">
                #supernatural
              </span>
              <span className="w-auto text-primary opacity-80 text-sm text-center">
                #supernatural
              </span>
              <span className="w-auto text-primary opacity-80 text-sm text-center">
                #supernatural
              </span>
            </div>
          </div>
          <div className="w-[215px] flex-shrink-0">
            <img
              src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-5U30gu2LSOv8.jpg"
              alt="hello"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
