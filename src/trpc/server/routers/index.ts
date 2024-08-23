import { createTRPCRouter, publicProcedure } from '..'

import { adminRoutes } from './admins'
import { articlesRoutes } from './articles'
import { creditBalanceRoutes } from './userCredits'
import { feedbacksRoutes } from './feedbacks'
import { reporterRoutes } from './reporters'
import { stripeRoutes } from './stripe'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articlesRoutes,
  feedbacks: feedbacksRoutes,
  creditBalance: creditBalanceRoutes,
  stripe: stripeRoutes,

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
