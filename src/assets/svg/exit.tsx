import * as React from 'react';

function Exit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} fill="none" {...props}>
      <rect
        width={3.229}
        height={19.371}
        rx={1.614}
        transform="rotate(-44.93 2.804 1.16)"
        fill="#fff"
      />
      <rect
        width={3.229}
        height={19.371}
        rx={1.614}
        transform="rotate(-135.07 4.443 7.508)"
        fill="#fff"
      />
    </svg>
  );
}

const MemoExit = React.memo(Exit);
export default MemoExit;
