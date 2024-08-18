import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'

import { TRPCError } from '@trpc/server'
import { schemaCreateUser } from '@/forms/CreateUser'

export const adminRoutes = createTRPCRouter({
  adminMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.admin.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
})
