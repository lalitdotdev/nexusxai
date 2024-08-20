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

  //   Give feedback


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
