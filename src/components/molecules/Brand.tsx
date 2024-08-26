"use client"

import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import Logo from '../Logo';
import clsx from 'clsx';

interface NavLogoProps {
    href: string;
    title: string;
}

function NavLogo({ href, title }: NavLogoProps) {
    const pathname = usePathname()
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={clsx('flex h-9 items-center gap-2 rounded-xl px-2')}
            aria-label={title}
        >
            <Logo active={isActive} />
        </Link>
    );
}

export default NavLogo;
