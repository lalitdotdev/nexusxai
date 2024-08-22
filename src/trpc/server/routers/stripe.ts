import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'

import { TRPCError } from '@trpc/server'
import { schemaAddCredits } from '@/forms/addCredits'
import { schemaPayment } from '@/forms/schemas'
import { stripe } from '@/payment/stripe'
import { z } from 'zod'

export const stripeRoutes = createTRPCRouter({
  createSession: protectedProcedure()
    .input(schemaAddCredits)
    .mutation(async ({ ctx, input: { creditsCount } }) => {
      const { userId } = ctx
      //   create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Credits',
              },
              unit_amount: creditsCount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
        metadata: {
          userId,
          creditsCount,
        },
      })
      return { sessionId: session.id }
    }),

  checkout: protectedProcedure()
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx, input: { sessionId } }) => {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      const parsedCreditsInfo = schemaPayment.safeParse(session.metadata)

      if (!parsedCreditsInfo.success) {
        throw new TRPCError({
          message: 'Payload missing',
          code: 'UNPROCESSABLE_CONTENT',
        })
      }
      const { creditsCount, userId } = parsedCreditsInfo.data

      return ctx.db.creditBalance.upsert({
        where: { userId },
        create: {
          userId,
          balance: creditsCount,
          Transactions: {
            create: {
              amount: creditsCount,
              userId,
              notes: 'Credits purchased.',
            },
          },
        },
        update: {
          balance: { increment: creditsCount },
          Transactions: {
            create: {
              notes: 'Credits purchased.',
              amount: creditsCount,
              userId,
            },
          },
        },
      })
    }),
})
