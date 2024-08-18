'use client'

import { Button } from '../atoms/button'
import { Input } from '../atoms/input'
import { Label } from '@radix-ui/react-label'
import { Title3 } from '../atoms/typography'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { toast } from 'sonner'
import { trpcClient } from '@/trpc/clients/client'
import { useEffect } from 'react'
import { useFormCreateUser } from '@/forms/CreateUser'

export const CreateAdmin = () => {
    const { register, handleSubmit, reset } = useFormCreateUser()
    // const { toast } = useToast()

    const {
        data,
        isLoading,
        error,
        mutateAsync: createAdmin,
    } = trpcClient.admins.create.useMutation()

    useEffect(() => {
        if (data) {
            reset()
            toast.success('Admin created')
            revalidatePath('/admin/manageAdmins')
        }
    }, [data, reset, toast])

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error, toast])
    return (
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
            <Title3 className="mb-2">Create Admin</Title3>

            <form
                className="space-y-2"
                onSubmit={handleSubmit(async (data) => {
                    await createAdmin(data)
                })}
            >
                <Label>
                    <Input placeholder="UID" {...register('id')} />
                </Label>
                <Button
                    type="submit"
                    loading={isLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-white"
                >
                    Submit
                </Button>
            </form>
        </div>
    )
}
