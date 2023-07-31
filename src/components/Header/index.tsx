import React from 'react';
import { css } from '@emotion/react';
import * as I from '../../assets';
import * as S from './style';
import { useAtom } from 'jotai';
import { NavListValue } from 'atoms/Atom';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const [value, setValue] = useAtom(NavListValue);
  const router = useRouter();

  console.log(router.asPath);

  const NavList = [
    { label: 'Popular', to: '/' },
    { label: 'New', to: '/new' },
    { label: 'Trend', to: '/trend' },
    { label: 'Movie', to: '/movie' },
  ];

  return (
    <header css={S.HeaderWrapper}>
      <div css={S.HeaderSide('left')}>
        <div css={S.LogoWrapper}>
          <I.WhiteLogo />
        </div>
      </div>
      <ul css={S.HeaderCenter}>
        {NavList.map((item, index) => (
          <li
            key={`${item.label}__${index}`}
            css={S.NavItem(router.asPath === item.to)}
          >
            <Link href={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div css={S.HeaderSide('right')}>
        <I.BurgerMenu />
      </div>
    </header>
  );
}
