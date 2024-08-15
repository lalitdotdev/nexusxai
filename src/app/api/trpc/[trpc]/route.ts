import { NextRequest } from 'next/server'
import { appRouter } from '@/trpc/server/routers'
import { createTRPCContext } from '@/trpc/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  })
}

// Create a TRPC handler for the endpoint at /api/trpc that uses the appRouter and createContext function defined above to handle requests to the TRPC API endpoint using the fetchRequestHandler adapter function
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
  })

export { handler as GET, handler as POST }
