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
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.admin.findMany({ include: { User: true } })
  }),
  delete: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(({ ctx, input }) => {
      return ctx.db.admin.delete({ where: { id: input.id } })
    }),
})
