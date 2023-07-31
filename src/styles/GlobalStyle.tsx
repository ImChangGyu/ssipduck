import { css, Global } from '@emotion/react';
import { Poppins } from 'next/font/google';

const poppin = Poppins({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  fallback: [
    '-apple-system',
    'Malgun Gothic',
    'Apple SD Gothic Neo',
    'Roboto',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
  subsets: ['latin'],
});

const style = css`
  body {
    background: #f9f9fc;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    vertical-align: baseline;
    font-family: ${poppin};
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
