import { Angry, Frown, LucideIcon, Smile, SmilePlus } from 'lucide-react'

import { FeedbackType } from '@prisma/client'
import { ReactionButton } from './ReactionButton'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/utils/styles'
import { trpcClient } from '@/trpc/clients/client'

export interface IReactionPanelProps {
    className?: string
    feedback?: RouterOutputs['feedbacks']['giveMyFeedback']
    articleId: number
}

type FeedbackOption = {
    type: FeedbackType
    Icon: LucideIcon
}

//   feedback options array ----> this is the array of feedback options that is used to render the reaction buttons ----> the feedback options are an array of objects with the type and Icon properties ----> the type is the feedback type and the Icon is the LucideIcon component
const feedbackOptions: FeedbackOption[] = [
    { type: FeedbackType.LOVE, Icon: SmilePlus },
    { type: FeedbackType.LIKE, Icon: Smile },
    { type: FeedbackType.DISLIKE, Icon: Frown },
    { type: FeedbackType.HATE, Icon: Angry },
]


export const ReactionPanel = ({
    className,
    articleId,
}: IReactionPanelProps) => {
    //   my feedback query ----> this is the query that returns the user's feedback for the article ----> the query is used to fetch the user's feedback for the article ----> the query returns the feedback object with the type property
    const { data: myFeedback } = trpcClient.feedbacks.myFeedback.useQuery({
        id: articleId,
    })

    return (
        <div className={cn(`flex gap-2 mt-2`, className)}>
            {feedbackOptions.map((reaction) => (
                //   reaction button ----> this is the reaction button component that is rendered for each feedback option ----> the reaction button component is a button that displays the feedback icon and is conditionally selected based on the user's feedback for the article ----> the reaction button component is rendered for each feedback option in the feedbackOptions array
                <ReactionButton
                    key={reaction.type}
                    Icon={reaction.Icon}
                    selected={myFeedback?.type === reaction.type}
                    type={reaction.type}
                    articleId={articleId}
                />
            ))}
        </div>
    )
}
