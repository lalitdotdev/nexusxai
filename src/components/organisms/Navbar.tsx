import { Brand } from '../molecules/Brand'
import { Container } from '../atoms/container'
import { NavMenu } from '../molecules/NavMenu'
import { Sidebar } from './Sidebar'
import { UserButton } from '@clerk/nextjs'

export interface INavbarProps {}

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full  bg-white/60 backdrop-blur backdrop-filter p-4 border-b-2 ">
      <Container className="h-12">
        <div className="flex items-center justify-between h-full">
          <Brand />
          <div className="flex items-center gap-3">
            <NavMenu className="mr-8" />
            <UserButton />
            <Sidebar />
          </div>
        </div>
      </Container>
    </nav>
  )
}
