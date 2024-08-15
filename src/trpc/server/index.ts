// import { AIService } from '@/ai/ai.service'
// import { Role } from '@/util/types'
import { auth } from '@clerk/nextjs/server'
// import { authorizeUser } from './util'
import db from '@/lib/db'
import { initTRPC } from '@trpc/server'

export const t = initTRPC.create() // Create a new instance of TRPC

// Todo:  create a TRPC context that includes the database connection, session, and any other services you want to use in your procedures
// / Create a new instance of TRPC

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

// Todo: Create a protected procedure that requires a user to be signed in and have a specific role to access it (e.g. 'admin')
