'use client';

import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';
import { useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '~/components/ui/button';
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
          {/* Transparent overlay to block YouTube's default hover UI */}
          <div className="absolute inset-0 z-10" aria-hidden />
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayerMutedState}
            aria-label={muted ? '음소거 해제' : '음소거'}
            className="absolute bottom-14 right-4 z-20 size-10 rounded-full bg-black/30 text-white hover:bg-black/50"
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
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
