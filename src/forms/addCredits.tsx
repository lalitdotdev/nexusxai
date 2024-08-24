import { schemaPayment } from './schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaAddCredits = schemaPayment.omit({ userId: true })

// It takes a Zod schema as its generic parameter and infers the TypeScript type that matches the shape of data the schema validates.

export type FormTypeAddCredits = z.infer<typeof schemaAddCredits>

// exporting the form management hook
export const useFormAddCredits = () =>
  useForm<FormTypeAddCredits>({
    resolver: zodResolver(schemaAddCredits),
    defaultValues: { creditsCount: 20 },
  })
