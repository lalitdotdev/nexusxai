import { ArticlePage } from "@/components/globalTemplates/ArticlePage"

export default async function Article({ params }: { params: { id: string } }) {
    const articleId = +params.id
    return (
        <ArticlePage articleId={articleId} />
    )
}
