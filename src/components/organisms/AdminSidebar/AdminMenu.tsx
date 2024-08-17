'use client'

import {
  BookDashed,
  Feather,
  FilePenLine,
  Library,
  List,
  PersonStanding,
  Users,
} from 'lucide-react'

import { Link } from '../../molecules/CustomLink'
import SidebarRouteItem from './AdminSidebarRouteItem'
import { usePathname } from 'next/navigation'

const adminRoutes = [
  {
    icon: BookDashed,
    label: 'Dashboard',
    href: '/admin',
  },
  {
    icon: PersonStanding,
    label: 'Manage Admins',
    href: '/admin/manageAdmins',
  },
  {
    icon: Feather,
    label: 'Reporters',
    href: '/admin/manageReporters',
  },
  {
    icon: Library,
    label: 'Articles',
    href: '/admin/manageArticles',
  },
  {
    icon: Users,
    label: 'Users',
    href: '/admin/manageUsers',
  },
  {
    icon: FilePenLine,
    label: 'Editors',
    href: '/admin/manageEditors',
  },
]
export const AdminMenu = () => {
  return (
    <div className="flex flex-col mt-4 rounded-lg p-2 bg-white h-full">
      {adminRoutes.map((route) => (
        <SidebarRouteItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
