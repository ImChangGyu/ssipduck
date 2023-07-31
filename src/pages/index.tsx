import type { GetServerSideProps, NextPage } from 'next';
import { CardContainer } from 'containers';
import GET_ANI from 'queries/getAni.queries';
import { initializeApollo } from 'lib/apollo';
import { useQuery } from '@apollo/client';

const variables = {
  page: 1,
  isAdult: false,
  type: 'ANIME',
  sort: 'POPULARITY_DESC',
};

export default function Home() {
  const { data } = useQuery(GET_ANI, { variables });

  return (
    <>
      <CardContainer aniList={data?.Page.media} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<any>({ query: GET_ANI, variables });

  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  };
};
