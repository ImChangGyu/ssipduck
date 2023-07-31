import { css } from '@emotion/react';

export const HeaderWrapper = css`
  width: 100%;
  height: 80px;
  background: #4f92f6;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderSide = (position: 'left' | 'right') => css`
  position: absolute;
  ${position}: 40px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const LogoWrapper = css`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const HeaderCenter = css`
  display: flex;
  list-style: none;
  gap: 20px;
`;

export const NavItem = (currentPath: boolean) => css`
  a {
    color: #fff;
    opacity: ${currentPath ? '100%' : '50%'};
    font-weight: bold;
    font-size: 18px;
    text-decoration: none;
  }
`;
