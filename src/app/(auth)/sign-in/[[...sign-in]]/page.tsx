import React from 'react'
import { Shapes } from 'lucide-react'
import { SignIn } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className=" bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-8">
              <Shapes className="h-12 w-12 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Sign in to your account to continue
            </p>
            <SignIn />
          </div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Page
