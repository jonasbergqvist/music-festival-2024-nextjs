import NextAuth, { Session } from "next-auth"
import OptiOidcProvider from "./OptiOidcProvider"
import { JWT } from "next-auth/jwt";

export const authOptions: any = {
  providers: [
    OptiOidcProvider({
      clientId: `${process.env.NEXT_PUBLIC_LOGIN_CLIENT_ID}`,
      authorization: { params: { scope: "openid profile offline_access email roles epi_content_delivery" } },
      clientSecret: '',
      checks: ['pkce', 'state', 'nonce'],
      client: {
        token_endpoint_auth_method: 'none'
      },
    }),
  ],
  callbacks: {
    async jwt({token, account}: any){
        if (account) {
          const firstSplit = account.access_token.split('.')[1]
          const buffer = Buffer.from(firstSplit, 'base64')
          const accessTokenParsed = buffer.toJSON()

          token.user = accessTokenParsed
          token.access_token = account.access_token
        }
        return token
    },
    async session(session: Session, token: JWT){
        session = {...token, ...session}
        return session
      }
  }
}

export default NextAuth(authOptions)