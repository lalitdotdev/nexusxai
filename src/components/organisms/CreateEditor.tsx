'use client'

import { $Enums } from '@prisma/client'
import { Button } from '../atoms/button'
import { HtmlSelect } from '../atoms/select'
import { Input } from '../atoms/input'
import { Label } from '../atoms/label'
import { TextArea } from '../atoms/textArea'
import { UploadImage } from '../molecules/UploadImage'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { trpcClient } from '@/trpc/clients/client'
import { useFormCreateEditor } from '@/forms/CreateEditor'
import { useRouter } from 'next/navigation'
import { useToast } from '../molecules/Toaster/use-toast'

export const CreateEditor = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useFormCreateEditor()
    const { toast } = useToast()

    const router = useRouter()

    const { mutateAsync: createEditor } = trpcClient.editors.create.useMutation({
        onSuccess(data, variables, context) {
            toast({ title: `Editor ${data.name} updated.` })
            reset()
            revalidatePath('/user/editors')
            router.replace('/user/editors')
        },
        onError(error, variables, context) {
            toast({ title: 'Action failed.' })
        },
    })

    const { imagePublicId, ...data } = watch()

    console.log(data)


    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                await createEditor(data)
            })}
            className="p-2 md:p-3 md:grid md:grid-cols-2 gap-4"
        >
            <div>
                <Label title={'Name'} error={errors.name?.message}>
                    <Input placeholder="Name..." {...register('name')} />
                </Label>
                <Label title="Style" error={errors.style?.message}>
                    <HtmlSelect placeholder="Style" {...register(`style`)}>
                        {Object.values($Enums.Style).map((type) => (
                            <option key={type} value={type}>
                                {type.split('_').join(' ')}
                            </option>
                        ))}
                    </HtmlSelect>
                </Label>
                <Label title="Language" error={errors.language?.message}>
                    <HtmlSelect placeholder="Language" {...register(`language`)}>
                        {Object.values($Enums.Language).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </HtmlSelect>
                </Label>
                <Label title="Verbosity" error={errors.verbosity?.message}>
                    <HtmlSelect placeholder="Verbosity" {...register(`verbosity`)}>
                        {Object.values($Enums.Verbosity).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </HtmlSelect>
                </Label>
                <Label title="WordComplexity" error={errors.wordComplexity?.message}>
                    <HtmlSelect
                        placeholder="WordComplexity"
                        {...register(`wordComplexity`)}
                    >
                        {Object.values($Enums.WordComplexity).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </HtmlSelect>
                </Label>
                <Label title={'Additional notes'} error={errors.name?.message}>
                    <TextArea
                        placeholder="Additional notes..."
                        {...register('additionalNotes')}
                    />
                </Label>
            </div>
            <UploadImage
                imagePublicId={imagePublicId}
                setValue={(publicId) => {
                    setValue('imagePublicId', publicId)
                }}
            />
            <Button type="submit">Create</Button>
        </form>
    )
}
