import { createTRPCRouter, protectedProcedure } from '..'

import { TRPCError } from '@trpc/server'
import { schemaCreateEditor } from '@/forms/CreateEditor'
import { schemaNumberID } from '@/forms/schemas'

export const editorRoutes = createTRPCRouter({
  create: protectedProcedure()
    .input(schemaCreateEditor)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.editor.create({
        data: { ...input, userId: ctx.userId },
      })
    }),

  findAll: protectedProcedure().query(({ ctx }) => {
    return ctx.db.editor.findMany({
      include: { User: true },
    })
  }),
})
