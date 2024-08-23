import { AddCredits } from './AddCredits'
import { BaseComponent } from '@/utils/types'
import { cn } from '@/utils/styles'
import { trpcServer } from '@/trpc/clients/server'

export const ShowCreditBalance = async ({ className }: BaseComponent) => {
    const creditBalance = await trpcServer.creditBalance.myCreditBalance.query()
    return (
        <div
            className={cn(
                ' flex flex-col justify-center items-start bg-white p-4 rounded-lg shadow-lg',
                className,
            )}
        >
            <div className="text-gray-600">Credit balance</div>
            <div className="font-bold text-5xl text-primary mb-4">
                {creditBalance?.balance.toFixed(2) || 0}
            </div>
            <AddCredits />
        </div>
    )
}
