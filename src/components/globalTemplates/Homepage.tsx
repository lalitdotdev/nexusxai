'use client'

import { ArticleCard } from '../organisms/ArticleCard'
import { Loading } from '../molecules/Loading'
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
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <motion.h1
          className="text-2xl md:text-3xl lg:text-6xl font-bold  mb-12 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your <span className="text-zinc-700">Recommended</span> Articles
        </motion.h1>

        {isLoading ? (
          <Loading />
        ) : (
          <motion.div
            className="gap-6 space-y-4 md:space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {data?.map(({ article, score }, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArticleCard article={article} score={score} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {isFetching && !isLoading && <Loading className="mt-8" />}
      </div>
    </div>
  )
}
