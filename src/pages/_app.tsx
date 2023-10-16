import '@/styles/globals.css'
import { Layout } from '@/components/Layout/Layout';

import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://cg.optimizely.com/content/v2?auth=Gu4sjMCSpAqLJp4RqBaSDGGS4eZj4pvpKpq2YH15VKx3QmgH',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;