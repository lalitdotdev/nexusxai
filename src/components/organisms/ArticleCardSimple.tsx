import { Badge } from '../atoms/badge'
import { DisplayDate } from '../molecules/DisplayDate'
import Link from 'next/link'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/utils/styles'

export interface IArticleCardSimpleProps {
    article: RouterOutputs['reporters']['myArticles'][0]
}

export const ArticleCardSimple = ({ article }: IArticleCardSimpleProps) => {
    return (
        <Link href={`/article/${article.id}`} className="">
            <div
                className={cn(
                    'py-2 transition-all',
                    article.published ? '' : 'text-gray-400 md:pl-4 border-l',
                )}
            >
                <div
                    className={cn(
                        'text-lg font-medium group-hover:underline underline-offset-4 ',
                    )}
                >
                    {article.title}
                </div>
                <DisplayDate dateString={article.createdAt} className="mt-2" />
                <Badge variant={'secondary'}>
                    {article.published ? 'published' : 'unpublished'}
                </Badge>
                <div className="flex flex-wrap gap-2 mt-2">
                    {article.tags.map((tag) => (
                        <Badge key={tag} variant={'outline'}>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </Link>
    )
}
