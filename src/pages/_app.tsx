import '@/styles/globals.css'
import { Layout } from '@/components/Layout/Layout';

import type { AppProps } from 'next/app';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SessionProvider, useSession } from "next-auth/react"
import { ExtendedSession } from '@/components/LoginBtn';

const httpLink = createHttpLink({
  uri: 'https://cg.optimizely.com/content/v2?auth=NsfqFlN2UN1srJEEJyBGobakhagSIbmpSZBhyseRJHuaqoJ2',
});

function getPreviewToken(): string {
  const queryString = window?.location?.search;
  if (!queryString) {
    return ""
  }

  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('preview_token')?.toString() ?? ""
}

// let authLink: ApolloLink;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const preview_token = getPreviewToken();
  const token = localStorage.getItem("accessToken")
  console.log("token", token)
  if (token) {
    return {
      uri: 'https://cg.optimizely.com/content/v2',
      headers: {
        ...headers,
        preview_token: preview_token,
        authorization: `Bearer ${token}`,
        "CG-Tenant-Id": "299a9bb409ef4b0ba10f15e824d8f1f4"
      }
    }
  }
  return {
    headers: {
      ...headers,
      preview_token: preview_token,
    }
  }
});

function Auth({ children }: any) {
  const { data: session } = useSession({ required: false })
  const extendedSession: ExtendedSession = session as ExtendedSession
  if (extendedSession?.token?.accessToken) {
    localStorage.setItem("accessToken", extendedSession.token.accessToken)
  }

  return children
}

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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

export default MyApp;