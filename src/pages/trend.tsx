import { useQuery } from '@apollo/client';
import { CardContainer } from 'containers';
import { initializeApollo } from 'lib/apollo';
import { GetServerSideProps } from 'next';
import GET_ANI from 'queries/getAni.queries';

const variables = {
  page: 1,
  isAdult: false,
  type: 'ANIME',
  sort: 'POPULARITY_DESC',
  seasonYear: 2023,
  season: 'SUMMER',
};

export default function Trend() {
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
