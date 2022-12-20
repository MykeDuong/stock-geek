import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from 'zod';
import pool from "../../common/pg";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(1).max(20),
        email: z.string().min(1).email("Must be a valid email address"),
        password: z.string().min(5),
      })
    )
    .mutation(({ input }) => {
      return {
        status: 200,
        msg: 'success',
      }
    })
});
