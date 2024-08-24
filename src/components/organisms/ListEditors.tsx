'use client'

import { AlertBox } from '../molecules/AlertBox'
import { BaseComponent } from '@/utils/types'
import { EditorCard } from './EditorCard'
import Loading from '@/app/(reporter)/reporter/myArticles/loading'
import { cn } from '@/utils/styles'
import { trpcClient } from '@/trpc/clients/client'
import { useAuth } from '@clerk/nextjs'

export const ListEditors = ({ className }: BaseComponent) => {
    const { data: myEditors, isFetching } = trpcClient.editors.myEditors.useQuery()

    const { userId } = useAuth()

    if (isFetching) {
        return (
            <div
                className={cn(
                    'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4',
                    className,
                )}
            >
                {[...Array(myEditors?.length)].map((_, index) => (
                    <Loading key={index} />
                ))}
            </div>
        )
    }

    if (myEditors?.length === 0) {
        return <AlertBox>No editors found.</AlertBox>
    }

    return (
        <div
            className={cn(
                'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4',
                className,
            )}
        >
            {myEditors?.map((editor) => (
                <EditorCard editor={editor} key={editor.id} isOwner={userId === editor.userId} />
            ))}
        </div>
    )
}
