'use client'

import {
    Feather,
    IndentDecrease,
    Lock,
    LucideIcon,
    Menu,
    PanelRightDashedIcon,
    Pen,
    User,
} from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from '../atoms/sheet'

import { Button } from '../atoms/button'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
import { buttonVariants } from '@/utils/styles/variants'
import { useAuth } from '@clerk/nextjs'
import { useDialogState } from '@/utils/hooks'

export interface INavSidebarProps { }

const menu: { href: string; title: string; icon: LucideIcon }[] = [
    { href: '/user', title: 'user', icon: User },
    { href: '/admin', title: 'admin', icon: Lock },
    { href: '/reporter', title: 'reporter', icon: Feather },
]

export function Sidebar() {
    const user = useAuth()

    const [open, setOpen] = useDialogState(false)

    if (!user.isSignedIn) {
        return (
            <Link href="/sign-in" className={buttonVariants({ variant: 'default' })}>
                Sign in
            </Link>
        )
    }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="link" size="none">
                    <PanelRightDashedIcon className='text-gray-400' />
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-slate-800 text-gray-300 border-slate-700">
                <div className="flex flex-col gap-2 mt-4 mb-8">
                    {menu.map((item) => (
                        <Link href={item.href} key={item.title}>
                            <div className="flex items-center gap-2">
                                <item.icon className="w-4 h-4" />
                                <div className="capitalize">{item.title}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <SignOutButton />
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
