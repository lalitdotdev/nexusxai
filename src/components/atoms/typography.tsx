import { BaseComponent } from '@/utils/types'
import { ReactNode } from 'react'
import { cn } from '@/utils/styles'

export const Title = ({ children, className }: BaseComponent) => {
  return (
    <div className={cn('text-xl font-semibold capitalize mb-2', className)}>
      {children}
    </div>
  )
}

export const Title2 = ({ children, className }: BaseComponent) => {
  return (
    <div
      className={cn(
        'text-lg font-semibold capitalize mb-2 text-zinc-700',
        className,
      )}
    >
      {children}
    </div>
  )
}
export const Title3 = ({ children, className }: BaseComponent) => {
  return (
    <div
      className={cn('font-semibold capitalize mb-2 text-zinc-700', className)}
    >
      {children}
    </div>
  )
}
export const Description = ({ children, className }: BaseComponent) => {
  return <div className={cn('text-zinc-600', className)}>{children}</div>
}
