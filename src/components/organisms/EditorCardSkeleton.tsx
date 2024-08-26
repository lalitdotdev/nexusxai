import { Skeleton } from '../ui/skeleton'

export const EditorCardSkeleton = () => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <Skeleton className="w-full h-48" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-4 w-1/4 mt-4" />
            </div>
        </div>
    )
}
