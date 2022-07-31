import React, { useState } from 'react';
import { Card, CardSkeleton, Pagenation, Selector } from 'components';
import { useQuery } from '@apollo/client';
import GET_ANI from 'queries/getAni.queries';
import { css } from '@emotion/react';
import { AniType } from 'types/Ani.type';
import { searchValueAtom, selectorValueAtom } from 'atoms/Atom';
import { useAtom, useAtomValue } from 'jotai';
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
  padding: 0 5rem;
  gap: 5rem;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  @media screen and (max-width: 1630px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 1240px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
  }
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

const CardContainer = () => {
  const [count, setCount] = useState<number>(1);
  const searchValue = useAtomValue(searchValueAtom);
  const selectorValue = useAtomValue(selectorValueAtom);

  const {
    loading,
    error,
    data: Anime,
  } = useQuery<AniType>(
    GET_ANI,
    searchValue === ''
      ? {
          variables: {
            page: count,
            isAdult: false,
            type: 'ANIME',
            sort: selectorValue,
          },
        }
      : {
          variables: {
            isAdult: false,
            type: 'ANIME',
            sort: selectorValue,
            search: searchValue,
          },
        }
  );

  const handleCountUp = () => {
    setCount((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleCountDown = () => {
    setCount((prev) => (prev === 1 ? prev : prev - 1));
    window.scrollTo(0, 0);
  };

  if (loading)
    return (
      <>
        <Pagenation
          handleCountDown={() => {}}
          handleCountUp={() => {}}
          count={count}
        />
        <div css={Positioner}>
          {MockData.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
        <Pagenation
          handleCountDown={() => {}}
          handleCountUp={() => {}}
          count={count}
        />
      </>
    );
  if (!Anime) return <div />;
  if (Anime.Page.media.toString() === '')
    return (
      <div css={NotFound}>
        <I.warning />
        <p css={NotFoundDesc}>해당 검색어의 애니를 찾을 수 없어요!</p>
      </div>
    );

  return (
    <>
      {searchValue === '' && (
        <Pagenation
          handleCountDown={handleCountDown}
          handleCountUp={handleCountUp}
          count={count}
        />
      )}

      <section css={Positioner}>
        {Anime.Page.media.map((ani, index) => (
          <Card
            key={index}
            genres={ani.genres}
            imageUrl={ani.coverImage.extraLarge}
            titleNative={ani.title.native}
            titleRomaji={ani.title.romaji}
            description={ani.description}
          />
        ))}
      </section>
      {searchValue === '' && (
        <Pagenation
          handleCountDown={handleCountDown}
          handleCountUp={handleCountUp}
          count={count}
        />
      )}
    </>
  );
};

export default CardContainer;
