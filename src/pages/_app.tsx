import '@/styles/globals.css'
import { Layout } from '@/components/Layout/Layout';

import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SessionProvider } from "next-auth/react"

const httpLink = createHttpLink({
  uri: 'https://cg.optimizely.com/content/v2?auth=PIaHauQNtPUD5OvgYQ5UxvJ4rOfjyylqfGJc2aCpSiTNGFjl',
});

function getPreviewToken(): string{
  const queryString = window?.location?.search;
  if(!queryString) {
      return ""
  }

  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('preview_token')?.toString() ?? ""
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getPreviewToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      preview_token: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;