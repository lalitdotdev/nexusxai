import { AlertBox } from '@/components/molecules/AlertBox'
import { redirect } from 'next/navigation'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const sessionId = searchParams?.session_id as string
  if (!sessionId) {
    return <AlertBox>Session id missing.</AlertBox>
  }

  const ticket = await trpcServer.stripe.checkout.mutate({
    sessionId,
  })

  if (ticket.id) {
    redirect('/user/credits')
  }
  return null
}
