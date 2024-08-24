'use client'

import { Button } from '../atoms/button'
import { CreateUserInput } from '@/forms/CreateUser'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/Toaster/use-toast'

export const DeleteReporterButton = ({ id }: CreateUserInput) => {
    const { toast } = useToast()

    const {
        data,
        isLoading,
        mutateAsync: deleteReporter,
    } = trpcClient.reporters.delete.useMutation({
        onSuccess() {
            toast({ title: 'Reporter deleted.' })
            revalidatePath('/admin/manageReporters')
        },
    })

    return (
        <Button
            loading={isLoading}
            onClick={async () => {
                await deleteReporter({ id })
            }}
            variant={'link'}
            size={'none'}
        >
            Delete
        </Button>
    )
}
