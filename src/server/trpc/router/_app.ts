import { router } from "../trpc";
import { authRouter } from "./auth";
import { tickerRouter } from "./ticker";
import { userRouter } from "./user";


export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  ticker: tickerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;