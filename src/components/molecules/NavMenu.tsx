import { BaseComponent } from '@/utils/types'
import Link from 'next/link'
import { SignInButton } from '@clerk/nextjs'
import { cn } from '@/utils/styles'

export const NavMenu = ({ className }: BaseComponent) => {
  return (
    <div className={cn('flex gap-2', className)}>
      <Link href="/editors">Editors</Link>
    </div>
  )
}
