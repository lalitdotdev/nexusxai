'use client'

import { ArticleCard } from '../organisms/ArticleCard'
import { Cover } from '../ui/Cover'
import HeaderImage from '../molecules/HeaderImage'
import { Loading } from '../molecules/Loading'
import Page from '@/contents-layouts/Page'
import { motion } from 'framer-motion'
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

        <div className="space-y-6 pt-4  rounded-lg text-gray-300">

            <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-12 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >

                Your Recommended Articles

            </motion.h1>

            {data?.map(({ article, score }) => (
                <ArticleCard key={article.id} article={article} score={score} />
            ))}
            {isFetching ? <Loading /> : null}


        </div>

    )
}
