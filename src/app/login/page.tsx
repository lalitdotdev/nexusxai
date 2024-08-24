import { SignIn, SignInButton } from '@clerk/nextjs'

import React from 'react'

function LoginPage() {
  return (
    <div className="flex py-10 md:py-0 flex-col flex-1 items-center justify-center bg-[#64b5f5] mt-80">
      <div className="grid  md:grid-cols-2 gap-5 md:gap-6 w-full justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-5 text-white">
          <div className="rounded-full bg-white p-5">
            {/* <Avatar seed='supergenie' classNames='h-60 w-60' /> */}
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold">NexusXAi</h1>
            <h2 className=" font-light text-base">Ai writer and reporters</h2>
            <h3 className="my-5 font-bold">
              <SignInButton />
            </h3>
          </div>
        </div>
        <div>
          <SignIn routing="hash" fallbackRedirectUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
