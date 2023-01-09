import { router, protectedProcedure, publicProcedure } from "../trpc";
import { number, z } from 'zod';
import { getMultipleTickers, getMultipleTickersAsObjects, getQuoteList, getRecommendations, getTickerInfo, getTrending, search } from "../../../utils/yahooFinance";
import { addToWatchlist, deleteFromWatchlist, getHistory, getHoldingsByTicker, getWatchlist, HistoryRowInterface, ScreenerInfoInterface, makeTransaction, saveScreener, viewScreeners, getScreenerById, ScreenerInterface, deleteScreener } from "../../../utils/pg";
import { TRPCError } from "@trpc/server";
import { defaultError } from "../../../utils/serverUtils";
import { m } from "framer-motion";

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
  viewScreeners: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      try {
        const result: ScreenerInfoInterface[] = await viewScreeners( userId );
        return result.map(screener => ({
          id: screener.screener_id,
          name: screener.screener_name,
          date: screener.create_time
        }));
      } catch (err) {
        if (err instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: err.message
          })
        } else {
          throw defaultError
        }
      }

    }),
  getScreenerById: protectedProcedure
    .input(
      z.object({ id: z.number().min(1) })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const result: ScreenerInterface = await getScreenerById(id);
      const retVal  = {
        marketCap: { 
          min: result.market_cap_min, 
          max: result.market_cap_max,
        },
        avgVolume: { 
          min: result.volume_min, 
          max: result.volume_max, 
        },
        PE: { 
          min: result.pe_min, 
          max: result.pe_max,
        },
        DE: { 
          min: result.de_min,
          max: result.de_max,
        },
        beta: { 
          min: result.beta_min, 
          max: result.beta_max,
        },
        price: { 
          min: result.price_min, 
          max: result. price_max, 
        },
      }
      return retVal
    }),
  saveScreener: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        marketCap: z.object({ 
          min: z.number().nullable(), 
          max: z.number().nullable()
        }),
        avgVolume: z.object({ 
          min: z.number().nullable(), 
          max: z.number().nullable() 
        }),
        PE: z.object({ min: z.number(), max: z.number() }),
        DE: z.object({ min: z.number(), max: z.number() }),
        beta: z.object({ min: z.number(), max: z.number() }),
        price: z.object({ min: z.number(), max: z.number() }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const inputQuery = {
        userId,
        name: input.name,
        marketCapMax: input.marketCap.max,
        marketCapMin: input.marketCap.min,
        volumeMin: input.avgVolume.min,
        volumeMax: input.avgVolume.max,
        peMin: input.PE.min,
        peMax: input.PE.max,
        deMin: input.DE.min,
        deMax: input.DE.max,
        betaMin: input.beta.min,
        betaMax: input.beta.max,
        priceMin: input.price.min,
        priceMax: input.price.max,
      }
      try {
        await saveScreener(inputQuery)
      } catch (err) {
        if (err instanceof Error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: err.message,
          })
        } else {
          throw defaultError;
        }
      }
    }),
  deleteScreener: protectedProcedure
    .input(
      z.object({ id: z.number().min(1) })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        await deleteScreener(id)
      } catch (err) {
        if (err instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: err.message
          }
          )
        }
        throw defaultError
      }
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

      const tickers = dbResult.map((row: { user_id: number; ticker: string; }) => row.ticker);
      const infoResult = await getMultipleTickers(tickers);

      // TODO: Check lastPrice, change, %change
      return infoResult.map((tickerInfo, index) => ({
        index,
        ticker: tickerInfo.symbol,
        company: tickerInfo.longName,
        lastPrice: tickerInfo.regularMarketPrice,
        change: tickerInfo.postMarketChange,
        percentageChange: tickerInfo.postMarketChange,
        marketCap: tickerInfo.marketCap,
      }))
    }),
  getHistory: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      const dbResult: HistoryRowInterface[] = await getHistory(userId);
      if (dbResult.length === 0) return []

      const tickers = dbResult.map(row => row.ticker);
      const infoResult = await getMultipleTickersAsObjects(tickers);
      return dbResult.map((row, index) => ({
        index,
        ticker: row.ticker,
        company: infoResult[row.ticker]?.longName,
        price: row.stock_price,
        quantity: row.quantity,
        totalValue: row.total_value,
        transactionType: row.transaction_type,
      }))
    }),
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
  makeTransaction: protectedProcedure
    .input(
      z.object({
        ticker: z.string().min(1),
        quantity: z.number().min(1),
        price: z.number().min(0),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { ticker, quantity, price, type } = input;

      if (type !== "buy" && type !== "sell") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Transaction action. Please try again."
        })
      }

      if (type === "sell") {
        const currentQuantity: number = await getHoldingsByTicker(userId, ticker);
        if (currentQuantity < quantity) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You do not have enough tickers to sell. Please try again."
          })
        }
      }

      await makeTransaction(userId, ticker, type, price, quantity);
      return {
        message: "Success"
      }
    })
});