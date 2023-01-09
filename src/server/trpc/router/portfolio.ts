import { router, protectedProcedure } from "../trpc";
import { z } from 'zod';
import { getHoldings, getHoldingsByTicker } from "../../../utils/pg";
import type { HoldingsInterface } from "../../../utils/pg";
import { defaultError } from "../../../utils/serverUtils";
import { getMultipleTickersAsObjects } from "../../../utils/yahooFinance";

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
  getHoldings: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      const dbResult = await getHoldings(userId)
      
      const tickers = dbResult.map((row: HoldingsInterface) => row.ticker);
      const yhResult = await getMultipleTickersAsObjects(tickers);
      console.log(yhResult);
    })
});