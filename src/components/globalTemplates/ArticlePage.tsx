'use client'

import { AlertBox } from '../molecules/AlertBox'
import { DisplayDate } from '../molecules/DisplayDate'
import Image from 'next/image'
import { Loading } from '../molecules/Loading'
import Markdown from 'react-markdown'
import { MoreLikeThis } from '../organisms/MoreLikeThis'
import { ReactionPanel } from '../organisms/ReactionPanel'
import { ReporterInfo } from '../molecules/ReporterInfo'
import { Separator } from '../ui/separator'
import { Slider } from "@/components/ui/slider"
import { cn } from '@/utils/styles'
import remarkGfm from 'remark-gfm'
import { trpcClient } from '@/trpc/clients/client'

export interface IArticlePageProps {
    articleId: number
}

export const ArticlePage = ({ articleId }: IArticlePageProps) => {
    const { data: article, isLoading } = trpcClient.articles.findOne.useQuery({
        id: articleId,
    })

    if (isLoading) {
        return <Loading />
    }
    if (!article) {
        return <AlertBox>Article not found.</AlertBox>
    }

    return (
        <div className={cn(' mx-auto mb-24 mt-12 ')}>
            <h1 className={cn('text-2xl font-semibold mb-2')}>{article.title}</h1>
            <DisplayDate dateString={article.createdAt} />
            <ReporterInfo
                image={article.Reporter.User.image}
                name={article.Reporter.User.name}
            />

            <div className="mt-4 whitespace-pre-wrap text-lg ">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {article.body}
                </Markdown>
            </div>
            <ReactionPanel articleId={article.id} />
            <Separator className="" />
            {/* <Slider defaultValue={[33]} max={100} step={1} /> */}

            <MoreLikeThis className="mt-8" id={article.id} />
        </div>
    )
}
