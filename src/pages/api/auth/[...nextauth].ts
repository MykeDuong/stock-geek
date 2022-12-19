import NextAuth, { type NextAuthOptions } from "next-auth";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // callbacks: {
  //   session({ session, user }) {
  //     if (session.user) {
  //       session.user.id = user.id;
  //     }
  //     return session;
  //   },
  // },
  providers: [],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
    newUser: '/auth/signup' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
