'use client'

import { ForwardRefRenderFunction, forwardRef } from 'react'
import NextLink, { LinkProps } from 'next/link'

import { Tally1 } from 'lucide-react'
import { cn } from '@/utils/styles'
import { usePathname } from 'next/navigation'

const CustomLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps
> = ({ children, href, className, ...props }, ref) => {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <NextLink
      ref={ref}
      href={href}
      className={cn(
        active ? 'font-semibold text-blue-600 ' : '',
        'flex gap-1 transition-all relative  items-center gap-x-2 py-4  text-sm font-[500] pl-6 cursor-pointer text-zinc-800',
        className,
      )}
      {...props}
    >
      {active ? <Tally1 className="absolute right-full" /> : null} {children}
    </NextLink>
  )
}

export const Link = forwardRef(CustomLinkComponent)
