'use client'

import { Button } from '../atoms/button'
import { CreateUserInput } from '@/forms/CreateUser'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { toast } from 'sonner'
import { trpcClient } from '@/trpc/clients/client'

export const DeleteAdminButton = ({ id }: CreateUserInput) => {
  const {
    data,
    isLoading,
    mutateAsync: deleteAdmin,
  } = trpcClient.admins.delete.useMutation({
    onSuccess() {
      toast.success(`Admin deleted successfully.`, {
        description: 'Request assistance from our admins and provide your ID.',
        // action: {
        //     label: "Undo",
        //     onClick: () => console.log("Undo"),
        // },
      })
      revalidatePath('/admin/manageAdmins')
    },
  })

  return (
    <Button
      loading={isLoading}
      onClick={async () => {
        await deleteAdmin({ id })
      }}
      variant={'destructive'}
      size={'sm'}
      className=""
    >
      Delete
    </Button>
  )
}
