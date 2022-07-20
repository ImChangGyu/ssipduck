import React, { useState } from 'react';
import { Card, CardSkeleton, Pagenation } from '../../components';
import { useQuery } from '@apollo/client';
import GET_ANI from '../../queries/getAni.queries';
import { css } from '@emotion/react';
import { AniType } from '../../types/Ani.type';

const MockData = [
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

  return (
    <>
      <Pagenation
        handleCountDown={handleCountDown}
        handleCountUp={handleCountUp}
        count={count}
      />
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
      <Pagenation
        handleCountDown={handleCountDown}
        handleCountUp={handleCountUp}
        count={count}
      />
    </>
  );
};

export default CardContainer;
