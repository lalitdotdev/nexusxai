import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../atoms/tooltip'

import { BaseComponent } from '@/utils/types'
import { CloundinaryImage } from '../molecules/CloudinaryImage'
import { Editor } from '@prisma/client'
import { EditorInfo } from './EditorInfo'
import Link from 'next/link'
import { cn } from '@/utils/styles'

export const EditorLink = ({
  pathname,
  className,
  selected = false,
  editor,
}: {
  pathname: string
  selected?: boolean
  editor: Omit<Editor, 'createdAt' | 'updatedAt'>
} & BaseComponent) => {
  const href = {
    pathname,
    query: { editorId: editor.id },
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <Link
            href={href}
            className={cn(
              'inline-block',
              selected
                ? 'shadow-lg shadow-black/30 rounded-full my-2 scale-125 bg-blue-100'
                : 'opacity-80 hover:scale-105',
            )}
          >
            <CloundinaryImage
              publicId={editor.imagePublicId}
              className="w-12 h-12 rounded-full flex-shrink-0 border border-black flex justify-center items-center transition-all duration-300"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={5}
          className="md:side-left mb-4 md:side-offset-10"
        >
          <div className="mb-2 font-semibold">{editor.name}</div>
          <div className="grid grid-cols-2 gap-3">
            <EditorInfo editor={editor} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
