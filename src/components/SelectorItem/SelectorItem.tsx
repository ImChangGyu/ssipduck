import React, { PropsWithChildren } from 'react';
import { css } from '@emotion/react';

const SelectorItemStyle = css`
  list-style: none;
  width: 100%;
  font-size: 14px;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  &:nth-child(1) {
    margin-top: 0.5rem;
  }
`;

type SelectorItemProps = {
  onClick: () => void;
};

const SelectorItem = ({
  children,
  onClick,
}: PropsWithChildren<SelectorItemProps>) => {
  return (
    <li css={SelectorItemStyle} onClick={onClick}>
      {children}
    </li>
  );
};

export default SelectorItem;
