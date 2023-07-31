import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

const Tag = css`
  width: auto;
  color: #4f92f6;
  opacity: 0.8;
  font-size: 12px;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const GenreTag = ({ children }: PropsWithChildren) => {
  return <span css={Tag}>{children}</span>;
};

export default GenreTag;
