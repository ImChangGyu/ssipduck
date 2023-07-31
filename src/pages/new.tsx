import { dehydrate, QueryClient } from '@tanstack/react-query';
import request from 'graphql-request';
import GET_ANI from 'queries/getAni.queries';
import { GetServerSideProps } from 'next';
import { CardContainer } from 'containers';
import { initializeApollo } from 'lib/apollo';
import { useQuery } from '@apollo/client';
import { AniType } from 'types/Ani.type';

const variables = {
  page: 1,
  isAdult: false,
  type: 'ANIME',
  sort: 'START_DATE_DESC',
};

export default function New() {
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
