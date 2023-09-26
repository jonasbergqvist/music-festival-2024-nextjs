import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dev.cg.optimizely.com/content/v2?auth=thqghUxNlZKQ1gOaiWXP2WNoRylaFekGuJ3niZcEhDoztTJs',
  cache: new InMemoryCache(),
});

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;