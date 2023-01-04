import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from 'zod';
import { getQuoteList, getRecommendations, getTickerInfo, getTrending, search } from "../../../utils/yahooFinance";
import { Result } from "postcss";

export const tickerRouter = router({
  getRecommendations: protectedProcedure
    .input(
      z.object({ searchText: z.string().min(1) })
    )
    .query(async ({ input }) => {
      const { searchText } = input;
      const searchTickers = searchText.split(",");

      for(let i = 0; i < searchTickers.length; i++) {
        // Trim the excess whitespace.
        searchTickers[i] = searchTickers[i]!.replace(/^\s*/, "").replace(/\s*$/, "");
      }

      const result = await getRecommendations(searchTickers)
      console.log(result);
      return result;
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
  getScreenerResult: protectedProcedure
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
  search: protectedProcedure
    .input(
      z.object({ searchText: z.string().min(1) })
    )
    .query(async ({ input }) => {
      const { searchText } = input;
      const result = await search(searchText)
      console.log(result);
      return result;
    }),
  getTickerInfo: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .query(async ({ input }) => {
      const { ticker } = input;
      const queryResult = await getTickerInfo(ticker);
      console.log(queryResult)
      
      const result = {
        volume: queryResult.summaryDetail?.volume,
        dayHigh: queryResult.summaryDetail?.dayHigh,
        dayLow: queryResult.summaryDetail?.dayHigh,
        bid: queryResult.summaryDetail?.bid,
        ask: queryResult.summaryDetail?.ask,
        fiftyTwoWeekLow: queryResult.summaryDetail?.fiftyTwoWeekLow,
        fiftyTwoWeekHigh: queryResult.summaryDetail?.fiftyTwoWeekHigh, 
      }

      return result;
    })
}); 