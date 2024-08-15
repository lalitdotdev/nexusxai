import { createTRPCRouter, publicProcedure } from '..'

export const appRouter = createTRPCRouter({
  // Define your procedures here
  // publicProcedure,

  users: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany()
  }),

  // protectedProcedure,
  // adminProcedure,
  // userProcedure,
  // aiProcedure,
  // etc.
})

export type AppRouter = typeof appRouter
