import { AlertBox } from "@/components/molecules/AlertBox"
import { ArticleCard } from "@/components/organisms/ArticleCard"
import { ArticleCardSimple } from "@/components/organisms/ArticleCardSimple"
import { UpdateArticleStateButton } from "@/components/organisms/UpdateArticleStateButton"
import { trpcServer } from "@/trpc/clients/server"

export default async function MyArticlesPage() {
    const myArticles = await trpcServer.reporters.myArticles.query()

    if (!myArticles.length) {
        return <AlertBox>You have no articles.</AlertBox>
    }

    console.log('myArticles', myArticles)
    return (
        <div className="flex flex-col gap-4 w-full p-2 " >
            <h1 className="text-2xl font-bold">My Articles</h1>
            {myArticles.map((article) => (
                <div key={article.id} className="flex flex-col gap-2 p-1 md:p-2 space-y-2 border-b border-border mb-2">
                    <ArticleCardSimple article={article} />
                    <UpdateArticleStateButton articleId={article.id} published={article.published} />
                </div>
            ))}
        </div>
    )
}
