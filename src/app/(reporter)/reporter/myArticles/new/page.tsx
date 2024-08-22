import { AlertBox } from '@/components/molecules/AlertBox'
import { ArticleCardSimple } from '@/components/organisms/ArticleCardSimple'
import { NewArticle } from '@/components/globalTemplates/NewArticle'
import { UpdateArticleStateButton } from '@/components/organisms/UpdateArticleStateButton'
import { trpcServer } from '@/trpc/clients/server'

export default async function MyArticlesPage() {


    return (
        <div className="flex flex-col gap-4">
            <h1>My Articles</h1>
            <NewArticle />


        </div>
    )
}
