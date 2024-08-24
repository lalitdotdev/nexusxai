'use client'

import { FallingLines, ThreeDots } from 'react-loader-spinner'

import { BaseComponent } from '@/utils/types'
import React from 'react'
import { cn } from '@/utils/styles'

export const Loading = ({ children, className, ...props }: BaseComponent) => {
  return (
    <div className={cn('flex flex-col items-center my-12', className)}>
      {children ? (
        <div className="text-gray-600 text-xs mb-1">{children}</div>
      ) : null}
      <div className="-mt-10">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#6561E1"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  )
}
