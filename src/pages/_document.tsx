import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>씹덕</title>
        <meta name="description" content="씹덕들을 위한 애니메이션 리스트!" />
        <meta property="og:title" content="씹덕" />
        <meta property="op:type" content="website" />
        <meta property="og:url" content="https://ssipduck.vercel.app/" />
        <meta
          property="og:image"
          content="https://i.ibb.co/LY9MZnh/ssipduck.png"
        />
        <meta
          name="google-site-verification"
          content="o0LSiUYUh_txjvTvbLp-fnLi9cws0linvlyU4_x5PCQ"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
