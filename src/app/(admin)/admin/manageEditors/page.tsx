import { EditorCard } from '@/components/organisms/EditorCard'
import { Title2 } from '@/components/atoms/typography'
import { auth } from '@clerk/nextjs/server'
import { trpcServer } from '@/trpc/clients/server'

export default async function ManageArticles() {
    const editors = await trpcServer.editors.findAll.query()

    const { userId } = await auth()

    return (
        <main>
            <Title2>Manage Editors</Title2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {editors.map((editor) => (
                    <div key={editor.User.id}>
                        <EditorCard editor={editor} isOwner={editor.User.id === userId} />
                    </div>
                ))}
            </div>
        </main>
    )
}
