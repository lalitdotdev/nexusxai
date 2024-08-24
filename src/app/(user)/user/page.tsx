import { Banknote, Glasses } from 'lucide-react'

import { StatCard } from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'

export default async function UserPage() {
  const { balance, editors } = await trpcServer.users.dashboard.query()

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard href={'/user/credits'} label={'Balance'} Icon={Banknote}>
        {balance.toFixed(2)}
      </StatCard>
      <StatCard href={'/user/editors'} label={'Editors'} Icon={Glasses}>
        {editors || 0}
      </StatCard>
    </div>
  )
}
