import { TRPCError, initTRPC } from '@trpc/server'

import { Role } from '@/utils/types'
// import { AIService } from '@/ai/ai.service'
// import { Role } from '@/util/types'
import { auth } from '@clerk/nextjs/server'
import { authorizeUser } from './util'
// import { authorizeUser } from './util'
import db from '@/lib/db'

// Todo:  create a TRPC context that includes the database connection, session, and any other services you want to use in your procedures

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = auth()

  /**
   * TODO: Add  other services you want to use in your procedures here (add ai service)
   */

  return {
    db: db,
    session,

    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create()

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

// Todo: Create a protected procedure that requires a user to be signed in and have a specific role to access it (e.g. 'admin')
export const protectedProcedure = (...roles: Role[]) =>
  t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Sign in to access this data.',
      })
    }

    return next({ ctx: { ...ctx, userId: ctx.session.userId } })
  })
