'use client'

import { Button } from '../atoms/button'
import { Input } from '../atoms/input'
import { Label } from '@radix-ui/react-label'
import { Title3 } from '../atoms/typography'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { trpcClient } from '@/trpc/clients/client'
import { useEffect } from 'react'
import { useFormCreateUser } from '@/forms/CreateUser'
import { useToast } from '../molecules/Toaster/use-toast'

export const CreateReporter = () => {
  const { register, handleSubmit, reset } = useFormCreateUser()

  const { toast } = useToast()

  const {
    data,
    isLoading,
    error,
    mutateAsync: createReporter,
  } = trpcClient.reporters.create.useMutation()

  useEffect(() => {
    if (data) {
      reset()
      toast({ title: 'Reporter created.' })
      revalidatePath('/admin/manageReporters')
    }
  }, [data, reset, toast])

  useEffect(() => {
    if (error) {
      toast({ title: error.data?.code })
    }
  }, [error, toast])
  return (
    <div className="w-full max-w-md p-4 border border-slate-700 shadow-lg rounded-lg">
      <Title3 className="mb-2">Create Reporter</Title3>

      <form
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          await createReporter(data)
        })}
      >
        <Label>
          <Input placeholder="UID" {...register('id')} />
        </Label>
        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  )
}
