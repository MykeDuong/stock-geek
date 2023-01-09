import { router } from "../trpc";
import { authRouter } from "./auth";
import { portfolioRouter } from "./portfolio";
import { screenerRouter } from "./screeener";
import { tickerRouter } from "./ticker";
import { transactionRouter } from "./transaction";
import { userRouter } from "./user";
import { watchlistRouter } from "./watchlist";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  ticker: tickerRouter,
  watchlist: watchlistRouter,
  screener: screenerRouter,
  transaction: transactionRouter,
  portfolio: portfolioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;