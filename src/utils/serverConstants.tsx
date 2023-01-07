import { TRPCError } from "@trpc/server";

export const defaultError: TRPCError = {
  code: "INTERNAL_SERVER_ERROR",
  message: "An error has occurred. Please try again later.",
  name: "Default Error",
}