import { EditorCard } from '@/components/organisms/EditorCard'
import { auth } from '@clerk/nextjs/server'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const editors = await trpcServer.editors.findAll.query()
  const { userId } = auth()
  console.log('auth userId', userId)

  return (
    <div className="grid grid-cols-4 gap-3 mt-10">
      {editors.map((editor) => (
        <EditorCard
          editor={editor}
          key={editor.id}
          isOwner={userId === editor.userId}
        />
      ))}
    </div>
  )
}
