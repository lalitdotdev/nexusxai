import { createTRPCRouter, publicProcedure } from '..'

import { adminRoutes } from './admins'
import { articlesRoutes } from './articles'
import { creditBalanceRoutes } from './userCredits'
import { editorRoutes } from './editors'
import { feedbacksRoutes } from './feedbacks'
import { reporterRoutes } from './reporters'
import { stripeRoutes } from './stripe'
import { userRoutes } from './users'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articlesRoutes,
  feedbacks: feedbacksRoutes,
  creditBalance: creditBalanceRoutes,
  stripe: stripeRoutes,
  editors: editorRoutes,
  users: userRoutes,
  // Define your procedures here
  // publicProcedure,

  // protectedProcedure,
  // adminProcedure,
  // userProcedure,
  // aiProcedure,
  // etc.
})

export type AppRouter = typeof appRouter
