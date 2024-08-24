import { DeveloperInfo } from './DeveloperInfo'
import { Icons } from '../atoms/Icons'
import Link from 'next/link'
import { cn } from '@/utils/styles'

export interface IBrandProps {}

export const Brand = () => {
  return (
    <div>
      <Link href="/" className={cn(' text-primary-500 text-2xl')}>
        <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-semibold text-2xl md:text-3xl text-gray-900">
          Nexus
          <span className="relative px-2 text-green-500 font-semibold">
            xAi
            <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-3 text-green-500" />
          </span>{' '}
        </h2>
      </Link>
      {/* <DeveloperInfo /> */}
    </div>
  )
}
