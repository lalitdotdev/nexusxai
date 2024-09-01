'use client '

import { CreateAdmin } from '@/components/globalTemplates/CreateAdmin'
import { DeleteAdminButton } from '@/components/organisms/DeleteAdminButton'
import { Title2 } from '@/components/atoms/typography'
import { UserCard } from '@/components/organisms/UserCard'
import { trpcServer } from '@/trpc/clients/server'

export default async function ManageAdminsPage() {
  const admins = await trpcServer.admins.findAll.query()

  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <Title2 className="mb-2  py-1">Manage Admins</Title2>

      <p className="text-zinc-500">
        Admins have full access to the admin dashboard and can manage other
        admins, reporters, editors, and users.
        <br />
        Admins can also create, edit, and delete articles.
      </p>

      <CreateAdmin />

      <Title2 className="mt-8 mb-2">Admins</Title2>
      <div className="space-y-3">
        {admins.map((admin) => (
          <UserCard key={admin.User.id} user={admin.User}>
            <div className="flex justify-end mt-2">
              <DeleteAdminButton id={admin.id} />
            </div>
          </UserCard>
        ))}
      </div>
    </div>
  )
}
