import { router, protectedProcedure } from "../trpc";
import { z } from 'zod';

export const tickerRouter = router({
  getRecommendation: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .query(async ({ input }) => {
      console.log(input);
    })
});