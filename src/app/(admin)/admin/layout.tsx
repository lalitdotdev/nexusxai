import { AdminMenu } from '@/components/organisms/AdminSidebar/AdminMenu'
import Link from 'next/link'
import { SimpleSidebar } from '@/components/molecules/SimpleSidebar'
import { TellThem } from '@/components/molecules/TellThem'
import { auth } from '@clerk/nextjs/server'
import { trpcServer } from '@/trpc/clients/server'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    if (!userId) {
        return <Link href="/sign-in">Sign In</Link>
    }

    const adminMe = await trpcServer.admins.adminMe.query()
    if (!adminMe) {
        return (
            <div className="">
                <TellThem uid={userId} role="admin" />
            </div>
        )
    }


}
