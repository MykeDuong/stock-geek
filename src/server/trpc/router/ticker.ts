import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from 'zod';
import { DateTime } from 'luxon'
import { getRecommendations, getSPFiveHundred, getTickerInfo, getTrending, search } from "../../../utils/yahooFinance";
import { today } from "../../../utils/constants";

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
      return result;
    }),
  getTrending: publicProcedure
    .query(async () => {
      const quotes = await getTrending();
      
      if (!quotes) return [];

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
  search: protectedProcedure
    .input(
      z.object({ searchText: z.string().min(1) })
    )
    .query(async ({ input }) => {
      const { searchText } = input;
      const result = await search(searchText)
      return result;
    }),
  getTickerInfo: protectedProcedure
    .input(
      z.object({ ticker: z.string().min(1) })
    )
    .query(async ({ input }) => {
      const { ticker } = input;
      const queryResult = await getTickerInfo(ticker);

      return {
        volume: queryResult.summaryDetail?.volume,
        dayHigh: queryResult.summaryDetail?.dayHigh,
        dayLow: queryResult.summaryDetail?.dayHigh,
        bid: queryResult.summaryDetail?.bid,
        ask: queryResult.summaryDetail?.ask,
        fiftyTwoWeekLow: queryResult.summaryDetail?.fiftyTwoWeekLow,
        fiftyTwoWeekHigh: queryResult.summaryDetail?.fiftyTwoWeekHigh,
        name: queryResult.price?.longName,
        sector: queryResult.assetProfile?.sector,
        industry: queryResult.assetProfile?.industry,
        employees: queryResult.assetProfile?.fullTimeEmployees,
        summary: queryResult.assetProfile?.longBusinessSummary,
        marketState: queryResult.price?.marketState,
      }
    }),
  getSPFiveHundred: protectedProcedure
    .input(
      z.object({ startingPoint: z.date() })
    )
    .query(async ({ input }) => {
      const { startingPoint } = input;
      const historicalResult = await getSPFiveHundred(startingPoint);
      const todayResult = await getTickerInfo("^GSPC");
      
      const historicalData = historicalResult.map(row => {
        return {
          time: row.date,
          value: row.close,
        }
      });
      // historicalData.push({
      //   time: new Date(),
      //   value: todayResult.price?.regularMarketPrice,
      // });
      console.log(historicalData);
      return historicalData;
    })
});