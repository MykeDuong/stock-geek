import { router, protectedProcedure, publicProcedure } from "../trpc";
import { number, z } from 'zod';
import { getMultipleTickers, getQuoteList, getRecommendations, getTickerInfo, getTrending, search } from "../../../utils/yahooFinance";
import { addToWatchlist, deleteFromWatchlist, getWatchlist } from "../../../utils/pg";
import { TRPCError } from "@trpc/server";
import { defaultError } from "../../../utils/serverUtils";

export const watchlistRouter = router({
  addToWatchlist: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .mutation(async (req) => {
      const { input : { ticker }, ctx } = req;
      const userId = ctx.session.user.id;

      try {
        await addToWatchlist(userId, ticker);
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: err.message,
          })
        }
        throw new TRPCError(defaultError)
      }
    }),
  deleteFromWatchlist: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .mutation(async (req) => {
      const { input : { ticker }, ctx } = req;
      const userId = ctx.session.user.id;

      try {
        await deleteFromWatchlist(userId, ticker);
      } catch (err) {
        if (err instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: err.message,
          })
        }
        throw new TRPCError(defaultError)
      }
    }),
  getWatchlist: protectedProcedure
    .query(async ({ ctx }) => {
      // Get from DB
      const userId = ctx.session.user.id;
      const dbResult = await getWatchlist(userId);
      if (dbResult.length === 0) return [];

      // Get Data
      const tickers = dbResult.map((row: { user_id: number; ticker: string; }) => row.ticker);
      const infoResult = await getMultipleTickers(tickers);

      // TODO: Check lastPrice, change, %change
      return infoResult.map((tickerInfo, index) => ({
        index,
        ticker: tickerInfo.symbol,
        company: tickerInfo.longName,
        lastPrice: tickerInfo.regularMarketPrice,
        change: tickerInfo.regularMarketChange,
        percentageChange: tickerInfo.regularMarketChangePercent,
        marketCap: tickerInfo.marketCap,
      }))
    }),
});