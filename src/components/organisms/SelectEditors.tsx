'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { BaseComponent } from '@/utils/types'
import { EditorLink } from './EditorLink'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { User } from 'lucide-react'
import { buttonVariants } from '@/utils/styles/variants'
import { cn } from '@/utils/styles'
import { trpcClient } from '@/trpc/clients/client'

export const SelectEditors = ({ className }: BaseComponent) => {
    const { data: myEditors, isFetching: isFetchingMyEditors } =
        trpcClient.editors.myEditors.useQuery()
    const { data: favoriteEditors, isFetching: isFetchingFavoriteEditors } =
        trpcClient.editors.favoriteEditors.useQuery()
    const { data } = trpcClient.creditBalance.myCreditBalance.useQuery()

    const searchParams = useSearchParams()
    const selectedEditorId = searchParams.get('editorId')
    const editorIdAsNumber = selectedEditorId ? +selectedEditorId : null
    const pathname = usePathname()

    const insufficientBalance = (data?.balance || 0) <= 0
    const isFetching = isFetchingMyEditors || isFetchingFavoriteEditors

    if (isFetching) {
        return <SelectEditorsSkeleton />
    }
    return (
        <div className="fixed bottom-0 left-0 right-0 md:relative md:h-screen md:flex md:flex-col md:justify-center">
            <div
                className={cn(
                    'flex flex-row md:flex-col items-center gap-2 p-2 md:py-16',
                    'overflow-x-auto md:overflow-x-visible md:overflow-y-auto',
                    'bg-[#0d0d17] ',
                    'shadow-lg md:shadow-none backdrop-blur-lg rounded-2xl',
                    className,
                    insufficientBalance ? 'pointer-events-none opacity-50' : '',
                )}
                aria-disabled={insufficientBalance}
            >
                <Link
                    href={pathname}
                    className={cn(
                        'w-12 h-12 rounded-full border border-black flex scale-110 justify-center items-center transition-all md:mb-4',
                        !editorIdAsNumber ? 'shadow-lg shadow-black/30' : 'opacity-80',
                    )}
                >
                    <User />
                </Link>
                <div className={cn('w-1 h-1 bg-gray-400 md:h-1 md:w-full')} />
                {myEditors?.length ? (
                    <div className="flex flex-row md:flex-col gap-2 md:mb-4">
                        {myEditors?.map((editor) => (
                            <EditorLink
                                editor={editor}
                                selected={editorIdAsNumber === editor.id}
                                pathname={pathname}
                                key={editor.id}
                            />
                        ))}
                    </div>
                ) : null}
                <div className="flex flex-row md:flex-col gap-2">
                    {favoriteEditors?.map((editor) => (
                        <EditorLink
                            editor={editor}
                            selected={editorIdAsNumber === editor.id}
                            pathname={pathname}
                            key={editor.id}
                        />
                    ))}
                </div>
            </div>
            {insufficientBalance && (
                <Link
                    href="/user/credits"
                    className={cn(
                        'mb-2 text-center',
                        buttonVariants({ variant: 'link', size: 'sm' }),
                    )}
                >
                    Add credits
                </Link>
            )}
        </div>
    )
}

export const SelectEditorsSkeleton = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 md:relative md:h-screen md:flex md:flex-col md:justify-center ">
            <div className="flex flex-row md:flex-col items-center gap-2 p-2 md:py-16 bg-slate-800  md:bg-transparent border-l border-gray-400 rounded-l-lg">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="w-1 h-1 bg-gray-200 md:h-1 md:w-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
            </div>
        </div>
    )
}
