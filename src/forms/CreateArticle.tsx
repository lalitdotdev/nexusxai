import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaCreateArticle = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  tags: z.array(z.string()).min(1),
  published: z.boolean().default(true),
})

export type CreateArticleInput = z.infer<typeof schemaCreateArticle>
export const useFormCreateArticle = () =>
  useForm<CreateArticleInput>({ resolver: zodResolver(schemaCreateArticle) })
