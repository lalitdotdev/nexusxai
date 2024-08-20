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
