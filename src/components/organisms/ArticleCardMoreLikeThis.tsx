import { Badge } from '../atoms/badge'
import { DisplayDate } from '../molecules/DisplayDate'
import Link from 'next/link'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/utils/styles'

export const ArticleCardMoreLikeThis = ({
  relatedArticle,
}: {
  relatedArticle: NonNullable<
    RouterOutputs['articles']['moreLikeThisArticleRecommendations'][0]
  >
}) => {
  const { article, score } = relatedArticle
  return (
    <div>
      <div className="underline underline-offset-4 mb-2 ">
        {Math.floor(score * 100)}% Match
      </div>

      <Link href={`/article/${article.id}`}>
        <div
          className={cn(
            'text-lg font-medium hover:underline line-clamp-2 max-w-lg underline-offset-4 ',
          )}
        >
          {article.title}
        </div>
      </Link>

      <div className="max-w-md mt-1 text-sm gray-500 line-clamp-2">
        {article.summary}
      </div>
      <DisplayDate dateString={article.createdAt} className="mt-2" />
      <div className="flex flex-wrap gap-2 mt-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant={'outline'}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
