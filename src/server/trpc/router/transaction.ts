import { router, protectedProcedure } from "../trpc";
import { z } from 'zod';
import { getMultipleTickersAsObjects } from "../../../utils/yahooFinance";
import type { HistoryRowInterface} from "../../../utils/pg";
import { getHistory, getHoldingsByTicker, makeTransaction } from "../../../utils/pg";
import { TRPCError } from "@trpc/server";

export const transactionRouter = router({
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