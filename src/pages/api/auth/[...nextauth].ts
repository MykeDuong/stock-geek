import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        usernameOrEmail: { type: "text" },
        password: {  type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
  
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  // pages: {
  //   signIn: '/auth',
  //   signOut: '/auth',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   newUser: '/auth' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
};

export default NextAuth(authOptions);
