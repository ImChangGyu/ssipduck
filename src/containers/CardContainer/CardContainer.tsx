import React, { useState } from 'react';
import { Card, CardSkeleton } from '../../components';
import { useQuery } from '@apollo/client';
import GET_ANI from '../../queries/getAni.queries';
import { css } from '@emotion/react';

const MockData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
];

export type AniType = {
  Page: {
    media: [
      {
        coverImage: { __typename: string; extraLarge: string };
        description: string;
        endDate: {
          __typename: string;
          year: number;
          month: number;
          day: number;
        };
        genres: string[];
        siteUrl: string;
        startDate: {
          __typename: string;
          yaer: number;
          month: number;
          day: number;
        };
        studios: {
          __typename: string;
          nodes: [
            {
              __typename: string;
              name: string;
            }
          ];
        };
        title: { __typename: string; english: string; native: string };
        __typename: string;
      }
    ];
  };
};

const Positioner = css`
  width: 100%;
  height: 100%;
  display: grid;
  margin-bottom: 5rem;
  padding: 0 5rem;
  gap: 2rem;
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
  }
`;

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

const CardContainer = () => {
  const [count, setCount] = useState<number>(1);

  const {
    loading,
    error,
    data: Anime,
  } = useQuery<AniType>(GET_ANI, {
    variables: {
      page: count,
      isAdult: false,
      type: 'ANIME',
      sort: 'POPULARITY_DESC',
    },
  });

  const handleCountUp = () => {
    setCount((prev) => prev + 1);
  };

  const handleCountDown = () => {
    setCount((prev) => (prev === 1 ? prev : prev - 1));
  };

  if (loading)
    return (
      <>
        <div css={Nav}>
          <span css={NavItem}>{'<'}</span>
          <span>{count}</span>
          <span css={NavItem}>{'>'}</span>
        </div>
        <div css={Positioner}>
          {MockData.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </>
    );

  return (
    <>
      <div css={Nav}>
        <span css={NavItem} onClick={handleCountDown}>
          {'<'}
        </span>
        <span>{count}</span>
        <span css={NavItem} onClick={handleCountUp}>
          {'>'}
        </span>
      </div>
      <section css={Positioner}>
        {Anime?.Page.media.map((ani, index) => (
          <Card
            key={index}
            genres={ani.genres}
            imageUrl={ani.coverImage.extraLarge}
            titleNative={ani.title.native}
            description={ani.description}
          />
        ))}
      </section>
      <div css={Nav}>
        <span css={NavItem} onClick={handleCountDown}>
          {'<'}
        </span>
        <span>{count}</span>
        <span css={NavItem} onClick={handleCountUp}>
          {'>'}
        </span>
      </div>
    </>
  );
};

export default CardContainer;
