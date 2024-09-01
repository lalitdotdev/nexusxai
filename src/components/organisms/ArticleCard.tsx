import { Badge } from '../atoms/badge'
import { DisplayDate } from '../molecules/DisplayDate'
import Link from 'next/link'
import { ReactionPanel } from './ReactionPanel'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/utils/styles'
import { motion } from 'framer-motion'

export const ArticleCard = ({
  article,
  score,
}: {
  article: NonNullable<
    RouterOutputs['articles']['userRecommendations'][0]['article']
  >
  score: number
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="p-6">
        <Link href={`/article/${article.id}`}>
          <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
            {article.title}
          </h2>
        </Link>

        <p className="text-gray-600 line-clamp-3 mb-4">{article.summary}</p>

        <div className="flex items-center justify-between mb-4">
          <DisplayDate
            dateString={article.createdAt}
            className="text-sm text-gray-500"
            dateFormat="PP"
          />
          <div className="text-sm text-gray-500">
            Relevance{' '}
            <span className="font-semibold text-blue-600">
              {Math.floor(score * 100)}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge
              key={tag}
              variant={'outline'}
              className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <ReactionPanel articleId={article.id} className="mt-2" />
      </div>
    </motion.div>
  )
}
