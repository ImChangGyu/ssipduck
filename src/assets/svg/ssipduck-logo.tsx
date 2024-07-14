import * as React from 'react';

function SsipduckLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={41} height={24} fill="none" {...props}>
      <circle cx={12.5} cy={6.5} r={5.5} stroke="#fff" />
      <circle cx={28.5} cy={6.5} r={5.5} stroke="#fff" />
      <path fill="#fff" d="M18 6h5v2h-5zM3 6h5v2H3zM33 6h5v2h-5z" />
      <path stroke="#fff" d="M4 12h33v4H4zM1 16h39v7H1z" />
      <path d="M29 17h2v5h-2zM33 17h2v5h-2z" />
    </svg>
  );
}

const MemoSsipduckLogo = React.memo(SsipduckLogo);
export default MemoSsipduckLogo;
