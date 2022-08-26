import type { NextPage } from 'next';
import Head from 'next/head';
import { CardContainer, InputContainer } from 'containers';

const Home: NextPage = () => {
  return (
    <div>
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
      </Head>
      <InputContainer />
      <CardContainer />
    </div>
  );
};

export default Home;
