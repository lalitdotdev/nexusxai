import { Link } from '../molecules/CustomLink'

export const ReporterMenu = () => {
  return (
    <div className=" flex flex-col mt-4 rounded-lg p-2 bg-white h-full">
      <Link href="/reporter"> Dashboard</Link>
      <Link href="/reporter/myArticles">My articles</Link>
      <Link className="pl-4" href="/reporter/myArticles/new">
        Create article
      </Link>
    </div>
  )
}
