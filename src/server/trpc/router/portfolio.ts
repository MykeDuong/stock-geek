import { z } from 'zod';
import { DateTime } from 'luxon'

import { router, protectedProcedure } from "../trpc";
import { findUserById, getHoldings, getHoldingsByTicker, getPortfolio, updatePortfolio } from "../../../utils/pg";
import type { HoldingsInterface , PortfolioRowInterface} from "../../../utils/pg";
import { defaultError } from "../../../utils/serverUtils";
import { getMultipleTickersAsObjects } from "../../../utils/yahooFinance";
import { constants } from 'buffer';

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
      const dbResult: HoldingsInterface[] = await getHoldings(userId)

      const tickers = dbResult.map((row: HoldingsInterface) => row.ticker);
      const yhResult = await getMultipleTickersAsObjects(tickers);

      return dbResult.map((row: HoldingsInterface) => ({
        ticker: row.ticker,
        company: yhResult[row.ticker]?.longName,
        currentPrice: yhResult[row.ticker]?.regularMarketPrice,
        purchasePrice: row.purchase_price,
        quantity: parseInt(row.quantity),
      }))
    }),
  getTimeSeriesValues: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      // Get new portfolio value
      const holdings: HoldingsInterface[] = await getHoldings(userId)
      const tickers = holdings.map((row: HoldingsInterface) => row.ticker);
      const yhResult = await getMultipleTickersAsObjects(tickers);
      
      const { cash } = await findUserById(userId);
      
      let totalValue: number = cash;
      holdings.forEach(row => {
        totalValue += yhResult[row.ticker]!.regularMarketPrice! * parseInt(row.quantity);
      })

      // Update portfolio
      await updatePortfolio(userId, totalValue);
      const dbResult: PortfolioRowInterface[] = await getPortfolio(userId);
     
      const result = dbResult.map(row => {

        return {
          date: row.date,
          value: row.value
        }
      })
      console.log(result);
      return result
    }),
});