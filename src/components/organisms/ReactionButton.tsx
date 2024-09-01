import { Loader, LucideIcon } from 'lucide-react'

import { Button } from '../atoms/button'
import { FeedbackType } from '@prisma/client'
import React from 'react'
import { cn } from '@/utils/styles'
import { motion } from 'framer-motion'
import { trpcClient } from '@/trpc/clients/client'

export interface IReactionButtonProps {
  Icon: LucideIcon
  type: FeedbackType
  articleId: number
  selected?: boolean
  label: string
}

export const ReactionButton = ({
  Icon,
  type,
  articleId,
  selected,
  label,
}: IReactionButtonProps) => {
  const utils = trpcClient.useUtils()

  const { mutateAsync: giveFeedback, isLoading } =
    trpcClient.feedbacks.giveMyFeedback.useMutation({
      onSuccess: () => {
        utils.feedbacks.myFeedback.invalidate()
        utils.articles.userRecommendations.invalidate()
      },
    })

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={selected ? 'default' : 'outline'}
        size="sm"
        onClick={async () => {
          await giveFeedback({
            articleId,
            type,
          })
        }}
        disabled={isLoading}
        className={cn(
          'transition-all duration-200 ease-in-out',
          'flex items-center space-x-2',
          'rounded-full px-4 py-2',
          selected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-600',
          'border border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
        )}
      >
        <Icon
          className={cn('w-4 h-4', selected ? 'text-white' : 'text-blue-600')}
        />
        <span className="text-xs font-medium hidden md:block">{label}</span>
        {isLoading && (
          <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600">
            <Loader className="animate-spin" />
          </div>
        )}
      </Button>
    </motion.div>
  )
}
