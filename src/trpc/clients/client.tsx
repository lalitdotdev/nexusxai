'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'

import { AppRouter } from '../server/routers'
import { getUrl } from './shared'
import { useState } from 'react'

export const trpcClient = createTRPCReact<AppRouter>()

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()) // Create a new QueryClient instance using the QueryClient constructor from the @tanstack/react-query package

  // Create a new trpc client instance using the createClient function from the @trpc/react-query package, passing in the httpBatchLink function from the shared.ts file and the URL of the TRPC API endpoint
  const [trpc] = useState(() =>
    trpcClient.createClient({
      links: [httpBatchLink({ url: getUrl() })],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <trpcClient.Provider client={trpc} queryClient={queryClient}>
        {props.children}
      </trpcClient.Provider>
    </QueryClientProvider>
  )
}

// Creating a TRPC React provider that wraps the application in a QueryClientProvider and a TRPC client provider. It is using the createTRPCReact function from the @trpc/react-query package to create a TRPC client instance with the httpBatchLink function from the shared.ts file and the URL of the TRPC API endpoint. This provider allows components in the application to make TRPC queries and mutations using the TRPC client instance and manage the cache using the QueryClient instance. This file is used to set up the TRPC client and cache for the application and provide them to the components that need them. The TRPCReactProvider component is exported as the default export of this file.
