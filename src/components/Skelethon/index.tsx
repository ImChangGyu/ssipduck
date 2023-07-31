import React from 'react';
import { css } from '@emotion/react';

const Tag = css`
  width: 100%;
  height: 20px;
  background-color: #f2f2f2;
  padding: 0.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
`;

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
  width: 100%;
  height: 360px;
  border-radius: 16px;
  box-shadow: 0 0 30px #eff1f4;
  background: #fff;
  padding: 24px;
`;

const Explain = css`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
`;

const ImageCss = css`
  width: 100%;
  height: 170px;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #f2f2f2;
`;

const Title = css`
  font-size: 16px;
  font-weight: 700;
  color: #0c2a56;
  background: #f2f2f2;
`;

const Description = css`
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
  background: #f2f2f2;
`;

const TitleWrapper = css`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  background: #f2f2f2;

  svg {
    fill: #4f92f6;
    margin-bottom: 3px;
    path {
      stroke: #4f92f6;
    }
  }
`;

const CardSkeleton = () => {
  return (
    <div css={ExplainContainer}>
      <div css={ImageCss} />
      <div css={Explain}>
        <div css={TitleWrapper}>
          <div css={Title} />
        </div>
        <p css={Description} />
        <div>
          <div css={Tag} />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
