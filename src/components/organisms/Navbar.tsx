import { Container } from '../atoms/container'
import Link from 'next/link'
import NavLogo from '../molecules/Brand'
import { NavMenu } from '../molecules/NavMenu'
import { Sidebar } from './Sidebar'
import { UserButton } from '@clerk/nextjs'

export interface INavbarProps {}

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full text-pink-500 py-2 md:py-6 px-8  rounded-b-2xl backdrop-blur-2xl overflow-x-hidden">
      <Container className=" mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <NavLogo href="/" title="Nexusxai" />
            <NavMenu className="space-x-6 text-sm" />
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/wall-of-fame"
              className="text-green-600 items-center text-sm hidden md:flex"
            >
              <span className="mr-1">👑</span>
              Wall of Fame
              <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </Link>
            <Link
              href="/feedback"
              className="text-gray-400 hover:text-white text-sm"
            >
              Feedback
              <span className="ml-1">↗</span>
            </Link>
            <UserButton />
            <Sidebar />
          </div>
        </div>
      </Container>
    </nav>
  )
}
