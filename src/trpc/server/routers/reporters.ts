import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'

import { TRPCError } from '@trpc/server'
import { schemaCreateUser } from '@/forms/CreateUser'

export const reporterRoutes = createTRPCRouter({
  reporterMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.reporter.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
})
