import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser } from "../../../utils/pg";
import { comparePassword } from "../../../utils/authUtils";

import { env } from "../../../env/server.mjs";
import { TRPCError } from "@trpc/server";

interface Error {
  message: string;
}

interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user)
        token.user = user;
      return token;
    },
    session: async ({ session, token }) =>{
      if (token.user) {
        session.user = token.user as UserInterface;
      }
      console.log("Session Ready")
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        usernameOrEmail: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) throw ({ message: "credentials not found" });
        const { usernameOrEmail, password } = credentials;

        let user;
        
        try {
          const result = await findUser(usernameOrEmail);
          user = { 
            id: result.user_id, 
            name: result.username, 
            email: result.email, 
            password: result.password 
          }

          const match = await comparePassword(password, user.password);
          console.log(match);
          if (!match) throw ({ message: "Password mismatch" });          
        } catch (err) {
          let message = "Unknown error";
          if (err instanceof Error) {
            message = err.message;
          }
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message
          })
        }
        return user;
      }
    }),
  ],
  pages: {  
    signIn: '/auth/',
    signOut: '/auth/',
    error: '/auth/error',
    newUser: '/auth',
  }
};

export default NextAuth(authOptions);
