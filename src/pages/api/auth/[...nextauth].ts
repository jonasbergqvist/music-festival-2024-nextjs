import NextAuth, { Session } from "next-auth"
import OptiOidcProvider from "./OptiOidcProvider"
import {refreshAccessToken} from "@/util/oauth";

export const authOptions: any = {
  providers: [
    OptiOidcProvider({
      clientId: `${process.env.NEXT_PUBLIC_LOGIN_CLIENT_ID}`,
      authorization: { params: { scope: "openid profile offline_access email roles epi_content_delivery" } },
      clientSecret: '',
      checks: ['pkce', 'state', 'nonce']
    }),
  ],
  callbacks: {
    async jwt({token, user, account}: any){
      if (account) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
          refreshToken: account.refresh_token,
          provider: account.provider,
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      return await refreshAccessToken(token)
  },
  async session(session: Session){
      return session
  }
  }
}

export default NextAuth(authOptions)