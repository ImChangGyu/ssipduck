import * as React from 'react';

function Speaker(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 75 75" {...props}>
      <path
        d="M39.389 13.769L22.235 28.606H6v19.093h15.989l17.4 15.051V13.769z"
        stroke="#fff"
        strokeWidth={5}
        strokeLinejoin="round"
        fill="#fff"
      />
      <path
        d="M48 27.6A19.5 19.5 0 0148 49m7.1-28.5a30 30 0 010 35.6M61.6 14a38.8 38.8 0 010 48.6"
        fill="none"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoSpeaker = React.memo(Speaker);
export default MemoSpeaker;
