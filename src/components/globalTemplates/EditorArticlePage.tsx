'use client'

import { AlertBox } from '../molecules/AlertBox'
import { DisplayDate } from '../molecules/DisplayDate'
import { EditorInfo } from '../organisms/EditorInfo'
import { Loading } from '../molecules/Loading'
import Markdown from 'react-markdown'
import { ReporterInfo } from '../molecules/ReporterInfo'
import { Title } from '../atoms/typography'
import { cn } from '@/utils/styles'
import remarkGfm from 'remark-gfm'
import { trpcClient } from '@/trpc/clients/client'

export interface IArticlePageProps {
  editorId: number
  articleId: number
}
export const EditorArticlePage = ({
  editorId,
  articleId,
}: IArticlePageProps) => {
  const { data: editorArticle, isLoading } =
    trpcClient.articles.editorArticle.useQuery({
      editorId,
      id: articleId,
    })

  if (isLoading) {
    return <Loading>Writing...</Loading>
  }

  if (!editorArticle) {
    return <AlertBox>Editor article not found.</AlertBox>
  }

  return (
    <div className={cn('max-w-3xl mx-auto mb-24 mt-12 p-4 ')}>
      <Title className={cn('text-xl font-semibold mb-2 text-zinc-800')}>
        {editorArticle.title}
      </Title>
      <DisplayDate dateString={editorArticle.createdAt} />

      <ReporterInfo
        publicId={editorArticle.Editor.imagePublicId}
        name={editorArticle.Editor.name}
      />
      <div className="grid grid-cols-2 gap-4 mt-4 p-2 border border-gray-300 rounded-lg text-zinc-700">
        <EditorInfo editor={editorArticle.Editor} />
      </div>
      <div className="mt-4 whitespace-pre-wrap text-lg text-zinc-700">
        <Markdown remarkPlugins={[remarkGfm]}>{editorArticle.body}</Markdown>
      </div>
    </div>
  )
}
