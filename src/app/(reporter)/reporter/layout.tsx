import Link from 'next/link'
import { ReporterMenu } from '@/components/organisms/ReporterMenu'
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

  const reporterMe = await trpcServer.reporters.reporterMe.query()
  if (!reporterMe) {
    return (
      <div className="">
        <TellThem uid={userId} role="reporter" />
      </div>
    )
  }

  return (
    <div className="flex space-x-4">
      <div className="hidden w-full max-w-xs sm:block">
        <ReporterMenu />
      </div>
      <div className="flex-grow">
        <div className="sm:hidden">
          <SimpleSidebar>
            <ReporterMenu />
          </SimpleSidebar>
        </div>
        <div className="bg-white min-h-[calc(100vh-8rem)] py-2 md:px-4 pt-4 mt-6 rounded-md">
          {children}
        </div>
      </div>
    </div>
  )
}
