import React, { useState } from 'react';
import { Card, CardSkeleton, Pagenation } from 'components';
import { css } from '@emotion/react';
import { AniListProps, type AniType } from 'types/Ani.type';
import { searchValueAtom, selectorValueAtom } from 'atoms/Atom';
import { useAtomValue } from 'jotai';
import * as I from 'assets';

const MockData: readonly number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
];

const Positioner = css`
  width: 100%;
  height: 100%;
  display: grid;
  margin-bottom: 5rem;
  padding: 40px;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-items: center;
`;

const NotFound = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundDesc = css`
  font-size: 20px;
  padding-top: 2rem;
  color: #d9d9d9;
`;

const CardContainer = ({ aniList }: AniListProps) => {
  const [count, setCount] = useState<number>(1);
  const searchValue = useAtomValue(searchValueAtom);
  const selectorValue = useAtomValue(selectorValueAtom);

  if (!aniList)
    return (
      <>
        <div css={Positioner}>
          {MockData.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </>
    );

  return (
    <>
      <section css={Positioner}>
        {aniList.map((ani, index) => (
          <Card
            key={index}
            genres={ani.genres}
            imageUrl={ani.coverImage.extraLarge}
            titleRomaji={ani.title.romaji}
            description={ani.description}
          />
        ))}
      </section>
    </>
  );
};

export default CardContainer;
