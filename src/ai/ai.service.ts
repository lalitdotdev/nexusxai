import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone'

import { FeedbackType } from '@prisma/client'
import { INDEX_NAME } from './constants'
import { RouterOutputs } from '@/trpc/clients/types'
import { TRPCError } from '@trpc/server'

export class AIService {
  private readonly pineconeIndex: Index<RecordMetadata>

  constructor() {
    // Create a Pinecone index if it doesn't exist
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
    })

    this.pineconeIndex = pinecone.Index(INDEX_NAME)
  }

  // addUser adds a user to the Pinecone index
  async addUser({ uid }: { uid: string }) {
    const values = await this.createEmbedding('default user')
    await this.pineconeIndex.upsert([
      {
        id: uid,
        values: values.data[0].embedding,
        metadata: {
          id: uid,
          type: 'user',
        },
      },
    ])
  }

  //   upsert article in the db
  async upsertArticle(article: RouterOutputs['articles']['create']) {
    // article should be an object that matches the shape of the output from a specific operation within a type called RouterOutputs, specifically the create operation under the articles namespace.
    const combinedText = `${article.title} ${article.body} ${article.tags.join(' ')}`

    const values = await this.createEmbedding(combinedText) // create embedding for the article text
    // upsert article in the pinecone vector database
    await this.pineconeIndex.upsert([
      {
        id: article.id.toString(), // article.id is a number, so we need to convert it to a string
        values: values.data[0].embedding,
        metadata: {
          ...article,
          summary: article.summary || '',
          type: 'article',
        },
      },
    ])
  }

  //   update article in the db -----> protected Routes (update) in pinecone vector database
  async updateArticle(articleId: number, published: boolean) {
    await this.pineconeIndex.update({
      id: articleId.toString(),
      metadata: { published },
    })
  }

  //   adding another user recommendations to the article object -----> protected Routes

  async userRecommendations({
    id,
  }: {
    id: string
  }): Promise<{ id: string; score: number }[]> {
    // fetch user information from the Pinecone vector database
    const { records } = await this.pineconeIndex.fetch([id])
    const userRecord = records[id]

    if (!userRecord?.values) {
      console.log('userRecord', userRecord)
      console.error('User record not found')
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User not found',
      })
    }

    // query response from the pinecone vector database ----> this is the query that returns the top 10 articles that are similar to the user based on the user's vector and the article's vector ----> the top 10 articles are returned as an array of objects with the id and score of each article
    const queryResponse = await this.pineconeIndex.query({
      vector: userRecord.values,
      topK: 10,
      includeMetadata: false, // we don't need the metadata for this query as we only need the ids
      includeValues: false, // we don't need the values for this query as we only need the ids
      filter: { type: 'article', published: true },
    })

    console.log('queryResponse', queryResponse)

    // map the matches to an array of objects with the id and score
    return queryResponse.matches.map(({ id, score }) => ({
      id,
      score: score || 0,
    }))
  }

  async giveFeedback({
    uid,
    articleId,
    type,
  }: {
    uid: string
    articleId: number
    type: FeedbackType
  }) {
    // Get records from the Pinecone vector database ----> this is the query that returns the user and article records based on the user's id and article's id ----> the user and article records are returned as an object with the id and values of each record
    const { records } = await this.pineconeIndex.fetch([
      uid,
      articleId.toString(),
    ])
    const userRecord = records[uid] // userRecord is an object with the user's vector and metadata
    const articleRecord = records[articleId.toString()] // articleRecord is an object with the article's vector and metadata

    if (!userRecord || !articleRecord) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User or article vector not found',
      })
    }

    const userVector = userRecord.values // get the user's vector
    const articleVector = articleRecord.values // get the article's vector

    const adjustmentScale = this.adjustmentScales[type] // get the adjustment scale for the feedback type

    // calculate the new user vector by adding the adjustment scale to the article vector and subtracting the user vector ----> this is the new user vector that will be updated in the Pinecone vector database ----> the new user vector is an array of numbers representing the updated vector
    const newUserVector = userVector.map(
      (value, index) =>
        value + adjustmentScale * (articleVector[index] - value),
    )

    await this.pineconeIndex.upsert([{ id: uid, values: newUserVector }])
  }

  // adjustmentScales is an object that maps feedback types to adjustment scales
  private adjustmentScales: { [key: string]: number } = {
    [FeedbackType.LOVE]: 0.3,
    [FeedbackType.LIKE]: 0.15,
    [FeedbackType.DISLIKE]: -0.15,
    [FeedbackType.HATE]: -0.3,
  }

  // createEmbedding creates an embedding for a given content string using the Voyage AI API and returns the embedding values
  private createEmbedding(content: string) {
    const apiUrl = `https://api.voyageai.com/v1/embeddings`
    const data = {
      input: content,
      model: 'voyage-2',
    }

    const voyageAIKey = process.env.VOYAGE_AI_KEY || ''
    if (!voyageAIKey) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'VOYAGE_AI_KEY is not set',
      })
    }

    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${voyageAIKey}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((embeddings) => {
        return embeddings
      })
      .catch((err) => {
        console.error('Error creating embedding:', err)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Error creating embedding',
        })
      })
  }
}
