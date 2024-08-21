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
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.reporter.findMany({ include: { User: true } })
  }),
  delete: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(({ ctx, input }) => {
      return ctx.db.reporter.delete({ where: { id: input.id } })
    }),
  create: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(async ({ ctx, input }) => {
      const reporter = await ctx.db.reporter.findUnique({ where: input })
      console.log('reporter', reporter)
      if (reporter) {
        return new TRPCError({
          code: 'BAD_REQUEST',
          message: 'The user is already a reporter.',
        })
      }
      return ctx.db.reporter.create({ data: input })
    }),

  myArticles: protectedProcedure('reporter', 'admin').query(({ ctx }) => {
    return ctx.db.article.findMany({ where: { reporterId: ctx.userId } })
  }),
})
