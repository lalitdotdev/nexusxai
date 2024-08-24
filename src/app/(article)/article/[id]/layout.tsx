import { SelectEditors } from '@/components/organisms/SelectEditors'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}

      {/* For larger screens */}
      <div className="hidden md:block fixed right-2 top-1/2 -translate-y-1/2">
        <SelectEditors />
      </div>

      {/* For smaller screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <SelectEditors />
      </div>
    </div>
  )
}
