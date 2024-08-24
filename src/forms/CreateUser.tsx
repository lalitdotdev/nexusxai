import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// defining the zod schema for the form
export const schemaCreateUser = z.object({
  id: z.string().min(1, { message: 'id is required' }), // id is required
})

export type CreateUserInput = z.infer<typeof schemaCreateUser> // infering type of user input form

// creating a react hook form here
export const useFormCreateUser = () =>
  useForm<CreateUserInput>({
    resolver: zodResolver(schemaCreateUser),
  })
