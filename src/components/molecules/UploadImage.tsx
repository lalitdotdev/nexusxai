'use client'

import { CldImage, CldUploadButton } from 'next-cloudinary'

import { toast } from 'sonner'

export const UploadImage = ({
  setValue,
  imagePublicId,
}: {
  setValue: (publicId: string) => void
  imagePublicId?: string | null
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {imagePublicId ? (
        <div className="relative group">
          <CldImage
            className="rounded-lg shadow-lg border-2 border-gray-600 transition-all duration-300 group-hover:opacity-75"
            width={300}
            height={300}
            src={imagePublicId}
            alt="Uploaded image"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setValue('')}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div className="w-64 h-64 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
          <CldUploadButton
            uploadPreset="ml_default"
            onSuccess={({ event, info }) => {
              if (typeof info === 'object' && 'public_id' in info) {
                const { public_id } = info
                setValue(public_id)
                toast.success('Image uploaded successfully')
              } else {
                console.error('Invalid info object:', info)
                toast.error('Failed to upload image')
              }
            }}
            onError={() => toast.error('Failed to upload image')}
          >
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-1 text-sm text-gray-600">
                Click to upload an image
              </p>
            </div>
          </CldUploadButton>
        </div>
      )}
    </div>
  )
}
