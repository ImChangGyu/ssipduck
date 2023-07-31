import React from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import GenreTag from '../GenreTag';
import * as SVG from 'assets';

const ExplainContainer = css`
  width: 100%;
  height: 360px;
  border-radius: 16px;
  box-shadow: 0 0 30px #eff1f4;
  background: #ffffff;
  padding: 24px;
`;

const Explain = css`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageCss = css`
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Title = css`
  font-size: 16px;
  font-weight: 700;
  color: #0c2a56;
`;

const Description = css`
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagWrapper = css``;

const TitleWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  svg {
    fill: #4f92f6;
    margin-bottom: 3px;
    path {
      stroke: #4f92f6;
    }
  }
`;

type CardProps = {
  imageUrl: string;
  description: string;
  genres: string[];
  titleRomaji: string;
};

const Card = ({ imageUrl, description, genres, titleRomaji }: CardProps) => {
  return (
    <div css={ExplainContainer}>
      <Image
        src={imageUrl}
        alt="애니메이션의 커버이미지입니다!"
        width={272}
        height={170}
        css={ImageCss}
      />
      <div css={Explain}>
        <div css={TitleWrapper}>
          <div css={Title}>{titleRomaji}</div>
          <SVG.Star />
        </div>
        <div css={Description}>{description}</div>
        <div css={TagWrapper}>
          {genres.map((genre, index) => {
            if (index < 3) {
              return <GenreTag key={index}>#{genre}</GenreTag>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
