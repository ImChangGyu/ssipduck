import React from 'react';
import { css } from '@emotion/react';

const ExplainContainer = css`
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(320px);
    }
  }
  width: 350px;
  height: 500px;
  position: relative;
  box-shadow: 3px 3px 13px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
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
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
`;

const Title = css`
  width: 100%;
  height: 20px;
  background-color: #f2f2f2;
  font-weight: bold;
`;

const Description = css`
  width: 100%;
  height: 50px;
  background-color: #f2f2f2;
`;

const Tag = css`
  width: 100%;
  height: 20px;
  background-color: #f2f2f2;
  padding: 0.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
`;

const TagWrapper = css``;

const CardSkeleton = () => {
  const returnTag = () => {
    for (let i = 0; i < 6; i++) {
      return <div css={Tag} />;
    }
  };

  return (
    <div css={ExplainContainer}>
      <div css={ImageCss}></div>
      <div css={Explain}>
        <div css={Title}></div>
        <p css={Description}></p>
        <div css={TagWrapper}>
          <div css={Tag} />
          <div css={Tag} />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
