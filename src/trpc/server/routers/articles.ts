import { createTRPCRouter, protectedProcedure } from '..'

import { fetchAndScoreRelatedArticles } from './shared/articles'

export const articlesRoutes = createTRPCRouter({
  //   adding another user recommendations to the article object -----> protected Routes

  userRecommendations: protectedProcedure().query(async ({ ctx }) => {
    const { ai, db, userId } = ctx
    return fetchAndScoreRelatedArticles({ ai, db, id: userId })
  }),
})
