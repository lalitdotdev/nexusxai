import { createTRPCRouter, publicProcedure } from '..'

import { adminRoutes } from './admins'
import { articlesRoutes } from './articles'
import { feedbacksRoutes } from './feedbacks'
import { reporterRoutes } from './reporters'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articlesRoutes,
  feedbacks: feedbacksRoutes,
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
