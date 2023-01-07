import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from 'zod';
import { hashPassword } from '../../../utils/authUtils';

import { createUser } from "../../../utils/pg";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(1).max(20),
        email: z.string().min(1).email("Must be a valid email address"),
        password: z.string().min(5),
      })
    )
    .mutation(async ({ input }) => {

      const { username, email, password } = input;

      const hashedPassword = await hashPassword(password);

      let user;

      try {
        user = await createUser(username, email, hashedPassword);
      } catch (err) {
        const message = "Sorry, your email or username has already been used";
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message,
        })
      }

      return {
        user,
        status: 200,
        msg: 'success',
      }
    }
  ),
});
