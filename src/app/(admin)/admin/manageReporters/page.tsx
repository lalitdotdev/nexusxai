'use client '

import { CreateReporter } from '@/components/globalTemplates/CreateReporter'
import { DeleteReporterButton } from '@/components/organisms/DeleteReporterButton'
import { Title2 } from '@/components/atoms/typography'
import { UserCard } from '@/components/organisms/UserCard'
import { trpcServer } from '@/trpc/clients/server'

export default async function ManageReportersPage() {
    const reporters = await trpcServer.reporters.findAll.query()

    return (
        <div className="flex flex-col gap-4 px-6 py-4">
            <Title2 className="mb-2">Manage Reporter</Title2>

            <hr />
            <CreateReporter />

            <Title2 className="mt-8 mb-2">Reporters</Title2>
            <div className="space-y-3">
                {reporters.map((reporter) => (
                    <UserCard key={reporter.User.id} user={reporter.User}>
                        <div className="flex justify-end mt-2">
                            <DeleteReporterButton id={reporter.id} />
                        </div>
                    </UserCard>
                ))}
            </div>
        </div>
    )
}
