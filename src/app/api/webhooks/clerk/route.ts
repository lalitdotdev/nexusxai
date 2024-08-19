import { AIService } from '@/ai/ai.service'
import { NextResponse } from 'next/server'
import { WebhookEvent } from '@clerk/nextjs/server'
import db from '@/lib/db'

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json()
  const ai = new AIService()

  if (payload.type === 'user.created') {
    const { id, first_name, last_name, image_url } = payload.data

    try {
      await db.user.create({
        data: {
          id,
          name: `${first_name} ${last_name}`,
          image: image_url,
        },
      })

      await ai.addUser({ uid: id })

      return NextResponse.json({ status: 'success' })
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json(
        { status: 'error', message: 'Failed to create user' },
        { status: 500 },
      )
    }
  } else {
    return NextResponse.json({ status: 'unsupported' })
  }
}
