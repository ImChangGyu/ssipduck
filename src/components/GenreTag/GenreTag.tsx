import { css } from '@emotion/react';
import React from 'react';

interface genreProps {
  children: React.ReactNode;
}

const Tag = css`
  width: auto;
  background-color: #c6c6c6;
  color: #ffffff;
  border-radius: 10px;
  font-size: 13px;
  padding: 0.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const GenreTag: React.FC<genreProps> = ({ children }) => {
  return <span css={Tag}>{children}</span>;
};

export default GenreTag;
