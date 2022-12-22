import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from 'zod';
import { findUserById } from "../../../utils/pg";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  getUserInfo: protectedProcedure
    .query(async ({ ctx }) => {
      const { id } = ctx.session.user;
      try {
        const result = await findUserById(id);
        return result;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as string),
        })
      }
    }
  ),
})