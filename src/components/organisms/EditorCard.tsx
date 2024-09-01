import { CloundinaryImage } from '../molecules/CloudinaryImage'
import { DeleteEditor } from './DeleteEditor'
import { EditorInfo } from './EditorInfo'
import { FavoriteEditorButton } from './FavoriteEditorButton'
import { RouterOutputs } from '@/trpc/clients/types'
import { Title2 } from '../atoms/typography'
import { UpdateEditor } from './UpdateEditor'

export const EditorCard = ({
  editor,
  isOwner,
}: {
  editor: NonNullable<RouterOutputs['editors']['myEditors'][0]>
  isOwner?: boolean
}) => {
  return (
    <div className="bg-green-50  rounded-lg overflow-hidden shadow-lg flex flex-col ">
      <div className="relative">
        <CloundinaryImage
          publicId={editor.imagePublicId}
          className="object-cover h-48 w-full"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <Title2 className="text-lg font-semibold text-zinc-600 truncate">
            {editor.name}
          </Title2>
          {isOwner ? (
            <div className="flex space-x-2">
              <UpdateEditor editor={editor} />
              <DeleteEditor editor={editor} />
            </div>
          ) : (
            <FavoriteEditorButton editor={editor} />
          )}
        </div>
        <EditorInfo editor={editor} />
        <div className="mt-2 text-xs text-gray-700">
          {editor.User.name || 'Anonymous'}
        </div>
      </div>
    </div>
  )
}
