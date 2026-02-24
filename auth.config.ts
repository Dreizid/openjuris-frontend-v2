import Auth0 from "@auth/core/providers/auth0";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    Auth0({
      clientId: import.meta.env.AUTH0_CLIENT_ID,
      clientSecret: import.meta.env.AUTH0_CLIENT_SECRET,
      issuer: import.meta.env.AUTH0_ISSUER,
      authorization: {
        params: {

          // WITHOUT THIS, ACCESS_TOKEN WILL BE UNDEFINED
          audience: import.meta.env.AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    // Stage 1: When Auth0 sends the token, I grab it and store it in the JWT
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    // Stage 2: I take the token from the JWT and put it into the Session object
    async session({ session, token }) {
      // @ts-ignore - session doesn't natively have accessToken in its Type
      session.accessToken = token.accessToken;
      return session;
    },
  }
});
