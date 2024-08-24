'use client'

import { usePathname, useRouter } from 'next/navigation'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/styles'

interface SidebarRouteItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarRouteItem = ({
  icon: Icon,
  label,
  href,
}: SidebarRouteItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = pathname === href

  const onClick = () => {
    router.push(href)
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 py-4  text-sm font-[500] pl-6 cursor-pointer',
        isActive && ' text-zinc-900 font-semibold border-r-2 border-zinc-900',
      )}
    >
      <div className="flex items-center gap-x-2 ">
        <Icon size={24} className="mr-4 text-zinc-600" />
        <span>{label}</span>
      </div>
    </button>
  )
}

export default SidebarRouteItem
