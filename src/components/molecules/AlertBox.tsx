import { ReactNode } from 'react'
import { cn } from '@/utils/styles'

export interface IAlertBoxProps {
    children: ReactNode
    className?: string
}

export const AlertBox = ({ children, className }: IAlertBoxProps) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center py-12 bg-[#0d0d17] text-white rounded-lg shadow-lg border border-slate-700',
                className,
            )}
        >
            {children}
        </div>
    )
}
