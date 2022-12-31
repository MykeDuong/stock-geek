import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from 'zod';
import { getTrending, headers } from "../../../utils/yahooFinance";
import { Result } from "postcss";

export const tickerRouter = router({
  getRecommendations: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .query(async ({ input }) => {
      console.log(input);
    }
  ),
  getTrending: publicProcedure
    .query(async () => {
      const apiResult = await getTrending();
      
      const quotes = apiResult.finance.result[0].quotes;

      interface QuoteInterface {quoteType: string, fullExchangeName: string}

      const result = quotes.filter((quote: QuoteInterface) => {
        if (quote.quoteType !== "EQUITY") return false;
        if (quote.fullExchangeName.includes("Nasdaq")) return true;
        if (quote.fullExchangeName.includes("NYSE")) return true;
        return false;
      })

      return result.slice(0, 10);
    }),
  getScreenerResult: publicProcedure
    .input(
      z.object({
        marketCap: z.object({ min: z.number(), max: z.number() }),
        avgVolume: z.object({ min: z.number(), max: z.number() }),
        PE: z.object({ min: z.number(), max: z.number() }),
        DE: z.object({ min: z.number(), max: z.number() }),
        beta: z.object({ min: z.number(), max: z.number() }),
        price: z.object({ min: z.number(), max: z.number() }),
      })
    )
    .query(async (input) => {
      return {}
    })
  
}); 