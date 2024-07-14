import * as React from 'react';

function Magnifier(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} fill="none" {...props}>
      <path
        d="M8.111 15.222A7.111 7.111 0 108.111 1a7.111 7.111 0 000 14.222zM17 17l-3.867-3.867"
        stroke="#D7D7D7"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoMagnifier = React.memo(Magnifier);
export default MemoMagnifier;
