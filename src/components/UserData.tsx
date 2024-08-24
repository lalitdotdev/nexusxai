import { RouterOutputs } from '@/trpc/clients/types'

export const UserData = ({ user }: { user: RouterOutputs['users'][0] }) => {
  return (
    <div>
      <h1>User Data</h1>
      <p>This is the user data page</p>
      <p>{user.id}</p>
      <p>{user.name}</p>
    </div>
  )
}
