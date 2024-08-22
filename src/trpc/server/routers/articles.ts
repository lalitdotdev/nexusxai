import { createTRPCRouter, protectedProcedure } from '..'
import {
  schemaCreateArticle,
  schemaNumberID,
  schemaUpdateArticle,
} from '@/forms/schemas'

import { fetchAndScoreRelatedArticles } from './shared/articles'

export const articlesRoutes = createTRPCRouter({
  create: protectedProcedure('admin', 'reporter')
    .input(schemaCreateArticle)
    .mutation(async ({ ctx, input }) => {
      const summaryLength = 200
      const summary = input.body.substring(0, summaryLength)

      const article = await ctx.db.article.create({
        data: { ...input, summary, Reporter: { connect: { id: ctx.userId } } },
      })
      await ctx.ai.upsertArticle({
        ...article,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
      })
      return article
    }),

  //   fetching all articles from the database -----> public Routes
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.article.findMany()
  }),

  //   fetching one article from the database -----> public Routes
  findOne: protectedProcedure()
    .input(schemaNumberID)
    .query(async ({ ctx, input }) => {
      return ctx.db.article.findUnique({
        where: { id: input.id },
        include: { Reporter: { include: { User: true } } },
      })
    }),

  update: protectedProcedure('admin', 'reporter')
    .input(schemaUpdateArticle)
    .mutation(async ({ input: { articleId, published }, ctx }) => {
      const article = await ctx.db.article.update({
        data: { published },
        where: { id: articleId },
      })
      await ctx.ai.updateArticle(articleId, published)
      return article
    }),

  //   adding another user recommendations to the article object -----> protected Routes

  userRecommendations: protectedProcedure().query(async ({ ctx }) => {
    const { ai, db, userId } = ctx
    return fetchAndScoreRelatedArticles({ ai, db, id: userId })
  }),

  //   more like this --> article recommendations
  moreLikeThisArticleRecommendations: protectedProcedure()
    .input(schemaNumberID)
    .query(async ({ ctx, input: { id } }) => {
      const { ai, db } = ctx
      return fetchAndScoreRelatedArticles({ ai, db, id: id.toString() })
    }),
})
