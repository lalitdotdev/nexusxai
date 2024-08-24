'use client'

import { BaseComponent } from '@/utils/types'
import { Button } from '../atoms/button'
import { Feather } from 'lucide-react'
import { cn } from '@/utils/styles'
import { revalidatePath } from '@/utils/actions/revalidatePath'
import { toast } from 'sonner'
import { trpcClient } from '@/trpc/clients/client'
import { usePathname } from 'next/navigation'

type InpublishButtonType = {
  articleId: number
  published: boolean
} & BaseComponent

export const UpdateArticleStateButton = ({
  articleId,
  className,
  published,
}: InpublishButtonType) => {
  const pathname = usePathname()
  const { mutateAsync, isLoading } = trpcClient.articles.update.useMutation({
    onSuccess() {
      toast.success(
        `Article ${articleId} is ${!published ? 'published' : 'unpublished'}`,
        {
          icon: <Feather className="w-5 h-5 text-green-600 " />,
          description: 'Article state updated',
        },
      )
      revalidatePath(pathname)
    },
  })
  return (
    <Button
      variant={published ? 'link' : 'default'}
      size={'sm'}
      loading={isLoading}
      className={cn(
        className,
        'bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block min-w-fit w-1/3',
      )}
      onClick={async () => {
        await mutateAsync({ articleId, published: !published })
      }}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
        <span> {published ? 'Unpublish' : 'Publish'}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.75 8.75L14.25 12L10.75 15.25"
          ></path>
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </Button>
  )
}
