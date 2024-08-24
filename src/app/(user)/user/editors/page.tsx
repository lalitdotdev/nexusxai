import React, { Suspense } from 'react'

import { ListEditors } from '@/components/organisms/ListEditors'
import Loading from '@/app/(reporter)/reporter/myArticles/loading'

const UserEditorsPage = () => {
    return (
        <main>
            <Suspense fallback={<Loading />}>
                <ListEditors />
            </Suspense>
        </main>
    )
}

export default UserEditorsPage
