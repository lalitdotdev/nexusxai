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
})
