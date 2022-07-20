import React from 'react';
import { css } from '@emotion/react';

interface PagenationBarProps {
  handleCountDown: () => void;
  handleCountUp: () => void;
  count: number;
}

const Nav = css`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;
  gap: 1rem;
  font-size: 18px;
`;

const NavItem = css`
  cursor: pointer;
  user-select: none;
`;

const PagenationBar: React.FC<PagenationBarProps> = ({
  handleCountDown,
  handleCountUp,
  count,
}) => {
  return (
    <div css={Nav}>
      <span css={NavItem} onClick={handleCountDown}>
        {'<'}
      </span>
      <span>{count}</span>
      <span css={NavItem} onClick={handleCountUp}>
        {'>'}
      </span>
    </div>
  );
};

export default PagenationBar;
