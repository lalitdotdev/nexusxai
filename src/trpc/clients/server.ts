// create trpc client that can interact with the next js server actions
import 'server-only'

import { AppRouter, appRouter } from '../server/routers'
import { TRPCClientError, createTRPCProxyClient } from '@trpc/client'

import { TRPCErrorResponse } from '@trpc/server/rpc'
import { cache } from 'react'
import { callProcedure } from '@trpc/server'
import { createTRPCContext } from '../server'
import { headers } from 'next/headers'
import { observable } from '@trpc/server/observable'

// create a trpccontext for the trpc client
const createContext = cache(() => {
  const heads = new Headers(headers()) // get all the headers from the request and pass them to the createTRPCContext function
  heads.set('x-trpc-source', 'rsc') // set the x-trpc header to 1 to indicate that the request is coming from a trpc client

  return createTRPCContext({ headers: heads })
})
// create the trpc PROXYclient
export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    () =>
      ({ op: { input, path, type } }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                ctx,
                path,
                type,
                rawInput: input,
                procedures: appRouter._def.procedures,
              })
            })
            .then((data) => {
              observer.next({ result: { data } })
              observer.complete()
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause))
            })
        }),
  ],
})
