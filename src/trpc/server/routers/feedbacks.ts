import { createTRPCRouter, protectedProcedure } from '..'
import { schemaGiveFeedback, schemaNumberID } from '@/forms/schemas'

export const feedbacksRoutes = createTRPCRouter({
  myFeedback: protectedProcedure()
    .input(schemaNumberID)
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.feedback.findUnique({
        where: {
          uid_articleId: {
            articleId: id,
            uid: ctx.userId,
          },
        },
      })
    }),

  giveMyFeedback: protectedProcedure()
    .input(schemaGiveFeedback)
    .mutation(async ({ ctx, input: { articleId, type } }) => {
      const feedback = await ctx.db.feedback.upsert({
        where: {
          uid_articleId: {
            articleId,
            uid: ctx.userId,
          },
        },
        create: {
          type,
          articleId,
          uid: ctx.userId,
        },
        update: {
          type,
        },
      })

      await ctx.ai.giveFeedback({ articleId, type, uid: ctx.userId })
      return feedback
    }),
})
