import React from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import GenreTag from '../GenreTag/GenreTag';

const ExplainContainer = css`
  width: 350px;
  height: 500px;
  position: relative;
  box-shadow: 3px 3px 13px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Explain = css`
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0px;
  padding: 1rem;
  background: #ffffff;
`;

const ImageCss = css`
  object-fit: cover;
`;

const Title = css`
  font-size: 18px;
  font-weight: bold;
`;

const Description = css`
  font-size: 13px;
  color: #7a7a7a;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagWrapper = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
`;

interface CardProps {
  imageUrl: string;
  titleNative: string;
  description: string;
  genres: string[];
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  titleNative,
  description,
  genres,
}) => {
  return (
    <div css={ExplainContainer}>
      <Image
        src={imageUrl}
        alt="애니메이션의 커버이미지입니다!"
        width={350}
        height={300}
        css={ImageCss}
      />
      <div css={Explain}>
        <span css={Title}>{titleNative}</span>
        <p css={Description}>{description}</p>
        <div css={TagWrapper}>
          {genres.map((genre, index) => (
            <GenreTag key={index}>{genre}</GenreTag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
