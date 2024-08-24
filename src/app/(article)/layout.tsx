export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-2  border-gray-200 px-4 py-6 sm:px-6">
      {children}
    </div>
  )
}
