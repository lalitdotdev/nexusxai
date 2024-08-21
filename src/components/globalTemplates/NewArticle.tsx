'use client'

import { Button } from "../atoms/button"
import { Controller } from "react-hook-form"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import { SelectTags } from "../molecules/SelectTags"
import { Switch } from "../atoms/switch"
import { TextArea } from "../atoms/textArea"
import { revalidatePath } from "@/utils/actions/revalidatePath"
import { toast } from "sonner"
import { trpcClient } from "@/trpc/clients/client"
import { trpcServer } from "@/trpc/clients/server"
import { useFormCreateArticle } from "@/forms/CreateArticle"
import { useRouter } from "next/navigation"

export const NewArticle = () => {
    const { register, handleSubmit, reset, setValue, control, watch } = useFormCreateArticle() // watch is used to get the value of the form field

    const router = useRouter()

    const formData = watch()

    console.log('formData', formData)
    const { mutateAsync, data, isLoading, error } = trpcClient.articles.create.useMutation({
        onSuccess: ({ title }) => {
            toast.success(`Article created: ${title}`)
            reset()
            revalidatePath('/reporter/myArticles')
            router.replace('/reporter/myArticles')

        }
    })


    return (
        <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit(async (data) => {
            await mutateAsync(data)
        })}>
            <Label title="Title">
                <Input {...register('title')} placeholder="Title" />
            </Label>

            <Label title="Body">
                <TextArea {...register('body')} placeholder="Body" />
            </Label>

            <Label title="Published">
                <Controller control={control} name="published" render={({ field }) => <Switch onCheckedChange={field.onChange} checked={field.value} />} />
            </Label>

            <SelectTags
                onChange={(tags) => {
                    console.log('tags', tags)
                    setValue('tags', tags)
                }}

                className="m-4"


            />

            <Button type="submit" disabled={isLoading} loading={isLoading}>
                {isLoading ? 'Creating...' : 'Create Article'}
            </Button>



        </form>
    )
}
