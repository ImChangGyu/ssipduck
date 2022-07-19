import { css, Global } from '@emotion/react';

const style = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
