import { DefaultValues, useForm } from 'react-hook-form'

import { $Enums } from '@prisma/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaCreateEditor = z.object({
    name: z.string().min(1, { message: 'Editor name is required' }),
    style: z.nativeEnum($Enums.Style),
    language: z.nativeEnum($Enums.Language),
    verbosity: z.nativeEnum($Enums.Verbosity),
    wordComplexity: z.nativeEnum($Enums.WordComplexity),
    imagePublicId: z.string().optional().nullable(),
    additionalNotes: z.string().optional().nullable(),
})

export type CreateEditorFormType = z.infer<typeof schemaCreateEditor>

export const useFormCreateEditor = () => useForm<CreateEditorFormType>({
    resolver: zodResolver(schemaCreateEditor),
})

export const useFormUpdateEditor = ({
    defaultValues,
}: {
    defaultValues: DefaultValues<CreateEditorFormType>
}) =>
    useForm<CreateEditorFormType>({
        resolver: zodResolver(schemaCreateEditor),
        defaultValues,
    })
