import { PostSkeleton } from './_components/PostSkeleton'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
}
