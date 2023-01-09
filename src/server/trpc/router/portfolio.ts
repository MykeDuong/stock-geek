import { router, protectedProcedure } from "../trpc";
import { z } from 'zod';
import { getHoldingsByTicker } from "../../../utils/pg";
import { defaultError } from "../../../utils/serverUtils";

export const portfolioRouter = router({
  getAvailability: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { ticker } = input;
      const result = await getHoldingsByTicker(userId, ticker);
      if (typeof result === 'number') {
        return result;
      } else {
        throw defaultError;
      }
    }),
});