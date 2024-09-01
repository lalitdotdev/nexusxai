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
        'flex items-center justify-center py-12 bg-blue-50 text-zinc-800 rounded-lg shadow-lg border border-orange-50',
        className,
      )}
    >
      {children}
    </div>
  )
}
