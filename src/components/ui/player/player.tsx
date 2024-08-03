'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import * as SVG from '~/assets/svg';
import { usePlayerMutedStore } from '~/store/player';

interface PlayerProps {
  url: string;
  placeholderImage: string;
}

export default function Player({ url, placeholderImage }: PlayerProps) {
  const { muted, togglePlayerMutedState } = usePlayerMutedStore();
  const [isVideoError, setIsVideoError] = useState(false);

  const playerConfig = useMemo(
    () => ({
      youtube: {
        playerVars: {
          showInfo: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          fs: 0,
          disablekb: 1,
        },
      },
      dailymotion: {
        params: {
          playerIsNavigationEnabled: false,
        },
      },
    }),
    []
  );

  return (
    <div className="w-full h-full relative">
      {!isVideoError && (
        <>
          <ReactPlayer
            url={url}
            config={playerConfig}
            autoPlay={true}
            playing={true}
            loop={true}
            muted={muted}
            onError={() => {
              setIsVideoError(true);
            }}
            width="100%"
            height="100%"
            className="w-full h-full absolute top-0 left-0 z-10"
          />
          <div
            onClick={togglePlayerMutedState}
            className="w-10 h-10 bg-[#00000055] absolute bottom-14 right-4 z-20 rounded-full flex items-center justify-center cursor-pointer"
          >
            {muted ? <SVG.Mute /> : <SVG.Speaker />}
          </div>
        </>
      )}
      <Image
        src={placeholderImage}
        alt="애니메이션 배너 사진"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
    </div>
  );
}
