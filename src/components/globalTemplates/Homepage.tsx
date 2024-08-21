'use client'

import { ArticleCard } from '../organisms/ArticleCard'
import { Loading } from '../molecules/Loading'
import { trpcClient } from '@/trpc/clients/client'
import { useEffect } from 'react'
import { useToast } from '../molecules/Toaster/use-toast'

export const HomePage = () => {
    const { data, isLoading, isFetching, error } =
        trpcClient.articles.userRecommendations.useQuery()
    const { toast } = useToast()

    useEffect(() => {
        if (error) {
            toast({ title: error.data?.code })
        }
    }, [error, toast])

    return (
        <div className="space-y-6 pt-4 border border-gray-200 rounded-lg">
            {data?.map(({ article, score }) => (
                <ArticleCard key={article.id} article={article} score={score} />
            ))}
            {isFetching ? <Loading /> : null}
        </div>
    )
}
