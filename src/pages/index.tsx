import type { NextPage } from 'next';
import Head from 'next/head';
import { CardContainer, InputContainer } from 'containers';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>씹덕</title>
      </Head>
      <InputContainer />
      <CardContainer />
    </div>
  );
};

export default Home;
