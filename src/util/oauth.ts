
const providerConfig: { [key: string]: { tokenUrl: string; clientId?: string; clientSecret?: string } } = {
    "optimizely_cms": {
      tokenUrl: `${process.env.NEXT_PUBLIC_LOGIN_AUTHORITY}/api/episerver/connect/token`,
      clientId: process.env.NEXT_PUBLIC_EPISERVER_CLIENT_ID,
    },
  };
  
 export async function refreshAccessToken(token: any) {
    try {
        if (!token.refreshToken) throw new Error('No refresh token available');
        const { provider } = token;
        const { tokenUrl, clientId, clientSecret } = providerConfig[provider];

        const data = {
            client_id: `${clientId}`,
            client_secret: `${clientSecret ?? ''}`,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
        }
    
        const response = await fetch(tokenUrl, {
            method: "POST", 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data),
          },
        );

        const refreshedTokens = await response.json();
    
        if (!response.ok) {
            throw refreshedTokens;
        }

        const  { access_token, expires_in, refresh_token } = refreshedTokens;

        token = {
            ...token,
            accessToken: access_token,
            accessTokenExpires: Date.now() + expires_in * 1000,
            refreshToken: refresh_token ?? token.refreshToken,
        }
        return token;
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
  }