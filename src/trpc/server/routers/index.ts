import { createTRPCRouter, publicProcedure } from '..'

export const appRouter = createTRPCRouter({})

export type AppRouter = typeof appRouter
