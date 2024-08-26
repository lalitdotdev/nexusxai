import { Badge } from '../atoms/badge'
import { DisplayDate } from '../molecules/DisplayDate'
import Link from 'next/link'
import { ReactionPanel } from './ReactionPanel'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/utils/styles'

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
        <div className={cn('border border-gray-700 rounded-lg  bg-slate-900 p-4')}>
            <Link href={`/article/${article.id}`}>
                <div
                    className={cn(
                        'text-lg font-semibold hover:underline line-clamp-2 max-w-lg underline-offset-4 text-gray-200 p-1 ',
                    )}
                >
                    {article.title}
                </div>
            </Link>

            <div className="max-w-md mt-1 text-sm gray-500 line-clamp-2 text-gray-400">
                {article.summary}
            </div>
            <DisplayDate
                dateString={article.createdAt}
                className="mt-2 text-gray-500"
                dateFormat="PP"
            />
            <div className="flex flex-wrap gap-2 mt-2 p-1 ">
                {article.tags.map((tag) => (
                    <Badge key={tag} variant={'outline'} className='text-gray-400 border-gray-700'>
                        {tag}
                    </Badge>
                ))}
            </div>
            <ReactionPanel articleId={article.id} className="mt-2 p-1" />

            <div className="mt-1 text-xs text-gray-500">
                Current relevance{' '}
                <span className="font-semibold">{Math.floor(score * 100)}</span>
            </div>
        </div>
    )
}
