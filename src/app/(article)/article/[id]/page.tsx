import { ArticlePage } from "@/components/globalTemplates/ArticlePage"
import { EditorArticlePage } from "@/components/globalTemplates/EditorArticlePage"

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined } // searchParams is an object that contains the query parameters from the URL
}) {
    const articleId = +params.id

    const editorId = searchParams.editorId ? Number(searchParams.editorId) : null // searchParams.editorId is a string that represents the editorId query parameter from the URL (if it exists)

    if (!editorId) {
        return <ArticlePage articleId={articleId} />
    }

    return <EditorArticlePage editorId={editorId} articleId={articleId} />
}
