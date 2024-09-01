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

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await createEditor(data)
      })}
      className="bg-slate-50 text-zinc-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label title={'Name'} error={errors.name?.message}>
            <Input
              placeholder="Name..."
              {...register('name')}
              className="bg-blue-50 border-blue-100 text-zinc-700"
            />
          </Label>
          <Label title="Style" error={errors.style?.message}>
            <HtmlSelect
              placeholder="Style"
              {...register(`style`)}
              className="bg-blue-50 border-blue-100 text-zinc-700"
            >
              {Object.values($Enums.Style).map((type) => (
                <option key={type} value={type}>
                  {type.split('_').join(' ')}
                </option>
              ))}
            </HtmlSelect>
          </Label>
          <Label title="Language" error={errors.language?.message}>
            <HtmlSelect
              placeholder="Language"
              {...register(`language`)}
              className="bg-blue-50 border-blue-100 text-zinc-700"
            >
              {Object.values($Enums.Language).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </HtmlSelect>
          </Label>
          <Label title="Verbosity" error={errors.verbosity?.message}>
            <HtmlSelect
              placeholder="Verbosity"
              {...register(`verbosity`)}
              className="bg-blue-50 border-blue-100 text-zinc-700"
            >
              {Object.values($Enums.Verbosity).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </HtmlSelect>
          </Label>
          <Label title="Word Complexity" error={errors.wordComplexity?.message}>
            <HtmlSelect
              placeholder="Word Complexity"
              {...register(`wordComplexity`)}
              className="bg-blue-50 border-blue-100 text-zinc-700"
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
              className="bg-blue-50 border-blue-100 text-zinc-700"
            />
          </Label>
        </div>
        <div>
          <UploadImage
            imagePublicId={imagePublicId}
            setValue={(publicId) => {
              setValue('imagePublicId', publicId)
            }}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </Button>
    </form>
  )
}
