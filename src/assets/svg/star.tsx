import * as React from 'react';

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={19} height={19} {...props}>
      <path d="M10.01 14.898l3.938 2.5c.508.32 1.133-.156.984-.742l-1.14-4.484a.68.68 0 01.226-.688L17.55 8.54c.461-.383.227-1.156-.375-1.195l-4.609-.297a.648.648 0 01-.57-.422l-1.719-4.328a.649.649 0 00-1.219 0L7.338 6.625a.648.648 0 01-.57.422l-4.61.297c-.6.039-.835.812-.374 1.195l3.531 2.945a.68.68 0 01.227.688l-1.055 4.156c-.18.703.57 1.274 1.172.89l3.664-2.32a.64.64 0 01.687 0z" />
    </svg>
  );
}

const MemoStar = React.memo(Star);
export default MemoStar;
