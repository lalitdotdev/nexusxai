import React, { Suspense } from 'react'

import { ListEditors } from '@/components/organisms/ListEditors'
import Loading from '@/app/(reporter)/reporter/myArticles/loading'

const UserEditorsPage = () => {
  return (
    <main>
      <ListEditors />
    </main>
  )
}

export default UserEditorsPage
