import * as React from 'react';

function Mute(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 75 75"
      stroke="#fff"
      strokeWidth={5}
      {...props}
    >
      <path
        d="M39 14L22 29H6v19h16l17 15z"
        fill="#fff"
        strokeLinejoin="round"
      />
      <path d="M49 26l20 24m0-24L49 50" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const MemoMute = React.memo(Mute);
export default MemoMute;
