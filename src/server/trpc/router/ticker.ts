import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from 'zod';
import { getQuoteList, getTrending, getTrendingDirect, headers } from "../../../utils/yahooFinance";
import { Result } from "postcss";

export const tickerRouter = router({
  getRecommendations: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .query(async ({ input }) => {
      return
    }),

  getTrending: publicProcedure
    .query(async () => {
      const quotes = await getTrending();
      
      const filteredQuotes = quotes.filter((quote) => {
        if (quote.quoteType !== "EQUITY") return false;
        if (quote.fullExchangeName.includes("Nasdaq")) return true;
        if (quote.fullExchangeName.includes("NYSE")) return true;
        return false;
      })

      const result = filteredQuotes.map((quote) => {
        return quote.symbol;
      })

      return result.slice(0, 10);
    }),
  getScreenerResult: publicProcedure
    .input(
      z.object({
        marketCap: z.object({ min: z.number().nullable(), max: z.number().nullable() }),
        avgVolume: z.object({ min: z.number().nullable(), max: z.number().nullable() }),
        PE: z.object({ min: z.number(), max: z.number() }),
        DE: z.object({ min: z.number(), max: z.number() }),
        beta: z.object({ min: z.number(), max: z.number() }),
        price: z.object({ min: z.number(), max: z.number() }),
      })
    )
    .query(async ({ input }) => {
      // TODO: wire api call


      return await getQuoteList()
    }),

  
}); 