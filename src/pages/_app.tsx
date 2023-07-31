import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import { Provider } from 'jotai';
import { useApollo } from '../lib/apollo';
import { Header } from 'components';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <GlobalStyle />
      <Provider>
        <ApolloProvider client={apolloClient}>
          <Header />
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default MyApp;
