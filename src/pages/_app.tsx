import '@/styles/globals.css'
import { Layout } from '@/components/Layout/Layout';

import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SessionProvider, useSession } from "next-auth/react"
import { useState } from 'react'
import { ExtendedSession } from '@/components/LoginBtn';

const httpLink = createHttpLink({
  uri: 'https://cg.optimizely.com/content/v2?auth=NsfqFlN2UN1srJEEJyBGobakhagSIbmpSZBhyseRJHuaqoJ2',
});

function getPreviewToken(): string{
  const queryString = window?.location?.search;
  if(!queryString) {
      return ""
  }

  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('preview_token')?.toString() ?? ""
}

let authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const preview_token = getPreviewToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      preview_token: preview_token
    }
  }
});

let client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  if(session) {
    
  }

  return (
    <SessionProvider session={session}>
      <Auth>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Auth>
    </SessionProvider>
  );
}

function Auth({ children }:any) {
  const { data: session } = useSession({required: false})
  const extendedSession: ExtendedSession = session as ExtendedSession
  if(extendedSession?.token?.access_token) {

    authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const preview_token = getPreviewToken();
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          preview_token: preview_token,
          //Authorization: 'Bearer ' + extendedSession.token.access_token
        }
      }
    });
    
    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  return children
}

export default MyApp;