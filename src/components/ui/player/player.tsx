'use client';

import { useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import * as SVG from '~/assets/svg';

interface PlayerProps {
  url: string;
}

export default function Player({ url }: PlayerProps) {
  const [isMute, setIsMute] = useState(true);

  const onMute = () => {
    setIsMute((prev) => !prev);
  };

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
    <div className="w-full h-full">
      <ReactPlayer
        url={url}
        config={playerConfig}
        autoplay={true}
        playing={true}
        loop={true}
        muted={isMute}
        width="100%"
        height="100%"
        className="w-full h-full absolute top-0 left-0"
      />
      <div
        onClick={onMute}
        className="w-10 h-10 bg-[#00000055] absolute bottom-14 right-4 rounded-full flex items-center justify-center cursor-pointer"
      >
        {isMute ? <SVG.Mute /> : <SVG.Speaker />}
      </div>
    </div>
  );
}
