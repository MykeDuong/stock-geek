import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from 'zod';
import { findUserById } from "../../../utils/pg";

export const userRouter = router({
  getUserInfo: protectedProcedure
    .query(({ ctx }) => {
      const { id } = ctx.session.user;

      const result = findUserById(id);
    }
  ),
})