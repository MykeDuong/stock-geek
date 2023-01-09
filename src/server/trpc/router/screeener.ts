import { router, protectedProcedure } from "../trpc";
import { z } from 'zod';
import { getQuoteList } from "../../../utils/yahooFinance";
import type { ScreenerInfoInterface, ScreenerInterface} from "../../../utils/pg";
import { saveScreener, viewScreeners, getScreenerById, deleteScreener } from "../../../utils/pg";
import { TRPCError } from "@trpc/server";
import { defaultError } from "../../../utils/serverUtils";

export const screenerRouter = router({
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
});